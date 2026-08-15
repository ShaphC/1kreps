"use server";

import { createClient } from "@/lib/supabase/server";

export type QuestionProgress = {
  questionId: string;
  questionText: string;
  expectedAnswer: string;
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  accuracy: number;
  currentStreak: number;
  successfulRecalls: number;
  masteryLevel: string;
  lastAttemptedAt: string | null;
};

export type ProgressSummary = {
  totalReps: number;
  correctAnswers: number;
  incorrectAnswers: number;
  accuracy: number;
  questionsPracticed: number;
  questionsMastered: number;
  currentStreak: number;
  questions: QuestionProgress[];
};

export async function getProgress(): Promise<{
  success: boolean;
  progress?: ProgressSummary;
  error?: string;
}> {
  const supabase = await createClient();

  // ---------------------------------------------------------
  // 1. Verify authenticated user
  // ---------------------------------------------------------

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      error: "You must be logged in.",
    };
  }

  // ---------------------------------------------------------
  // 2. Fetch user progress
  // ---------------------------------------------------------

  const { data: userProgress, error: progressError } =
    await supabase
      .from("reps_user_progress")
      .select(`
        question_id,
        total_attempts,
        correct_attempts,
        incorrect_attempts,
        accuracy,
        current_streak,
        successful_recalls,
        mastery_level,
        last_attempted_at
      `)
      .eq("user_id", user.id)
      .order("last_attempted_at", {
        ascending: false,
        nullsFirst: false,
      });

  if (progressError) {
    console.error(
      "Failed to fetch user progress:",
      progressError
    );

    return {
      success: false,
      error: "Could not load your progress.",
    };
  }

  // ---------------------------------------------------------
  // 3. No practice yet
  // ---------------------------------------------------------

  if (!userProgress || userProgress.length === 0) {
    return {
      success: true,
      progress: {
        totalReps: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        accuracy: 0,
        questionsPracticed: 0,
        questionsMastered: 0,
        currentStreak: 0,
        questions: [],
      },
    };
  }

  // ---------------------------------------------------------
  // 4. Fetch corresponding questions
  // ---------------------------------------------------------

  const questionIds = userProgress.map(
    (item) => item.question_id
  );

  const { data: questions, error: questionsError } =
    await supabase
      .from("reps_questions")
      .select(`
        id,
        question_text,
        expected_answer
      `)
      .in("id", questionIds);

  if (questionsError) {
    console.error(
      "Failed to fetch questions:",
      questionsError
    );

    return {
      success: false,
      error: "Could not load question details.",
    };
  }

  // ---------------------------------------------------------
  // 5. Create question lookup
  // ---------------------------------------------------------

  const questionMap = new Map(
    (questions ?? []).map((question) => [
      question.id,
      question,
    ])
  );

  // ---------------------------------------------------------
  // 6. Calculate summary statistics
  // ---------------------------------------------------------

  const totalReps = userProgress.reduce(
    (total, item) =>
      total + item.total_attempts,
    0
  );

  const correctAnswers = userProgress.reduce(
    (total, item) =>
      total + item.correct_attempts,
    0
  );

  const incorrectAnswers = userProgress.reduce(
    (total, item) =>
      total + item.incorrect_attempts,
    0
  );

  const accuracy =
    totalReps > 0
      ? Math.round(
          (correctAnswers / totalReps) * 100
        )
      : 0;

  const questionsPracticed =
    userProgress.length;

  const questionsMastered =
    userProgress.filter(
      (item) => item.mastery_level === "mastered"
    ).length;

  const currentStreak =
    userProgress.length > 0
      ? Math.max(
          ...userProgress.map(
            (item) => item.current_streak
          )
        )
      : 0;

  // ---------------------------------------------------------
  // 7. Build question progress
  // ---------------------------------------------------------

  const questionProgress: QuestionProgress[] = [];

  for (const item of userProgress) {
    const question = questionMap.get(
      item.question_id
    );

    if (!question) {
      continue;
    }

    questionProgress.push({
      questionId: question.id,
      questionText: question.question_text,
      expectedAnswer: question.expected_answer,
      totalAttempts: item.total_attempts,
      correctAttempts: item.correct_attempts,
      incorrectAttempts: item.incorrect_attempts,
      accuracy: Number(item.accuracy),
      currentStreak: item.current_streak,
      successfulRecalls: item.successful_recalls,
      masteryLevel: item.mastery_level,
      lastAttemptedAt: item.last_attempted_at,
    });
  }

  // ---------------------------------------------------------
  // 8. Return progress
  // ---------------------------------------------------------

  return {
    success: true,
    progress: {
      totalReps,
      correctAnswers,
      incorrectAnswers,
      accuracy,
      questionsPracticed,
      questionsMastered,
      currentStreak,
      questions: questionProgress,
    },
  };
}