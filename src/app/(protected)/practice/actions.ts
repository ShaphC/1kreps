"use server";

import { createClient } from "@/lib/supabase/server";
import { validateAnswer } from "@/lib/reps/answer-validation";
import { calculateProgress } from "@/lib/reps/progress";

export type SubmitAnswerResult = {
  success: boolean;
  correct: boolean;
  expectedAnswer: string;
  explanation: string;
  progress?: {
    totalAttempts: number;
    correctAttempts: number;
    incorrectAttempts: number;
    accuracy: number;
    currentStreak: number;
    successfulRecalls: number;
    masteryLevel: string;
  };
  error?: string;
};

export async function submitAnswer({
  questionId,
  submittedAnswer,
  practiceMode = "recall",
}: {
  questionId: string;
  submittedAnswer: string;
  practiceMode?: "recall" | "multiple_choice";
}): Promise<SubmitAnswerResult> {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return {
      success: false,
      correct: false,
      expectedAnswer: "",
      explanation: "",
      error: "You must be logged in to submit an answer.",
    };
  }

  const trimmedAnswer = submittedAnswer.trim();

  if (!trimmedAnswer) {
    return {
      success: false,
      correct: false,
      expectedAnswer: "",
      explanation: "",
      error: "Please enter an answer.",
    };
  }

  if (trimmedAnswer.length > 500) {
    return {
      success: false,
      correct: false,
      expectedAnswer: "",
      explanation: "",
      error: "Answer is too long.",
    };
  }

  const { data: question, error: questionError } = await supabase
    .from("reps_questions")
    .select(
      `
      id,
      question_text,
      expected_answer,
      accepted_answers,
      explanation,
      case_sensitive,
      category,
      topic
    `,
    )
    .eq("id", questionId)
    .eq("is_active", true)
    .single();

  if (questionError || !question) {
    return {
      success: false,
      correct: false,
      expectedAnswer: "",
      explanation: "",
      error: "Question not found.",
    };
  }

  const correct = validateAnswer({
    submittedAnswer: trimmedAnswer,
    acceptedAnswers: question.accepted_answers,
    caseSensitive: question.case_sensitive,
  });

  const { error: attemptError } = await supabase.from("reps_attempts").insert({
    user_id: user.id,
    question_id: question.id,
    submitted_answer: trimmedAnswer,
    is_correct: correct,
    practice_mode: practiceMode,
  });

  if (attemptError) {
    console.error("Failed to record practice attempt:", attemptError);

    return {
      success: false,
      correct: false,
      expectedAnswer: question.expected_answer,
      explanation: question.explanation,
      error: "We couldn't record your attempt. Please try again.",
    };
  }

  const { data: existingProgress, error: progressFetchError } = await supabase
    .from("reps_user_progress")
    .select(
      `
        id,
        total_attempts,
        correct_attempts,
        incorrect_attempts,
        accuracy,
        current_streak,
        successful_recalls,
        mastery_level
      `,
    )
    .eq("user_id", user.id)
    .eq("question_id", question.id)
    .maybeSingle();

  if (progressFetchError) {
    console.error("Failed to fetch user progress:", progressFetchError);

    return {
      success: false,
      correct,
      expectedAnswer: question.expected_answer,
      explanation: question.explanation,
      error: "Attempt recorded, but progress could not be updated.",
    };
  }

  const totalAttempts = (existingProgress?.total_attempts ?? 0) + 1;

  const correctAttempts =
    (existingProgress?.correct_attempts ?? 0) + (correct ? 1 : 0);

  const incorrectAttempts =
    (existingProgress?.incorrect_attempts ?? 0) + (correct ? 0 : 1);

  const currentStreak = correct
    ? (existingProgress?.current_streak ?? 0) + 1
    : 0;

  const successfulRecalls =
    (existingProgress?.successful_recalls ?? 0) + (correct ? 1 : 0);

  const progress = calculateProgress({
    totalAttempts,
    correctAttempts,
    incorrectAttempts,
    currentStreak,
    successfulRecalls,
  });

  const now = new Date().toISOString();

  if (existingProgress) {
    const { error: updateError } = await supabase
      .from("reps_user_progress")
      .update({
        total_attempts: progress.totalAttempts,
        correct_attempts: progress.correctAttempts,
        incorrect_attempts: progress.incorrectAttempts,
        accuracy: progress.accuracy,
        current_streak: progress.currentStreak,
        successful_recalls: progress.successfulRecalls,
        mastery_level: progress.masteryLevel,
        last_attempted_at: now,
        ...(correct ? { last_correct_at: now } : {}),
        updated_at: now,
      })
      .eq("id", existingProgress.id);

    if (updateError) {
      console.error("Failed to update user progress:", updateError);

      return {
        success: false,
        correct,
        expectedAnswer: question.expected_answer,
        explanation: question.explanation,
        error: "Attempt recorded, but progress could not be updated.",
      };
    }
  } else {
    const { error: insertError } = await supabase
      .from("reps_user_progress")
      .insert({
        user_id: user.id,
        question_id: question.id,
        total_attempts: progress.totalAttempts,
        correct_attempts: progress.correctAttempts,
        incorrect_attempts: progress.incorrectAttempts,
        accuracy: progress.accuracy,
        current_streak: progress.currentStreak,
        successful_recalls: progress.successfulRecalls,
        mastery_level: progress.masteryLevel,
        last_attempted_at: now,
        last_correct_at: correct ? now : null,
      });

    if (insertError) {
      console.error("Failed to create user progress:", insertError);

      return {
        success: false,
        correct,
        expectedAnswer: question.expected_answer,
        explanation: question.explanation,
        error: "Attempt recorded, but progress could not be created.",
      };
    }
  }

  return {
    success: true,
    correct,
    expectedAnswer: question.expected_answer,
    explanation: question.explanation,
    progress,
  };
}

// =========================================================
// GET NEXT QUESTION
// =========================================================

// =========================================================
// GET NEXT QUESTION
// =========================================================

export async function getNextQuestion(
  currentQuestionId: string,
  excludedQuestionIds: string[] = [],
) {
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
  // 2. Get the user's existing progress
  // ---------------------------------------------------------

  const { data: progress, error: progressError } = await supabase
    .from("reps_user_progress")
    .select(
      `
        question_id,
        total_attempts,
        correct_attempts,
        accuracy,
        mastery_level,
        last_attempted_at
      `,
    )
    .eq("user_id", user.id);

  if (progressError) {
    console.error("Failed to fetch question progress:", progressError);

    return {
      success: false,
      error: "Could not load your question progress.",
    };
  }

  // ---------------------------------------------------------
  // 3. Get active practice questions
  //
  // IMPORTANT:
  // Do not restrict this to builtin questions.
  // User-created questions can also be practiced.
  // ---------------------------------------------------------

  const { data: questions, error: questionsError } = await supabase
    .from("reps_questions")
    .select(
      `
        id,
        question_text,
        expected_answer,
        accepted_answers,
        explanation,
        case_sensitive,
        category,
        topic
      `,
    )
    .eq("is_active", true);

  if (questionsError) {
    console.error("Failed to load practice questions:", questionsError);

    return {
      success: false,
      error: "Could not load practice questions.",
    };
  }

  if (!questions || questions.length === 0) {
    return {
      success: false,
      error: "No practice questions are available.",
    };
  }

  // ---------------------------------------------------------
  // 4. Build exclusion set
  // ---------------------------------------------------------

  const excludedIds = new Set([currentQuestionId, ...excludedQuestionIds]);

  // ---------------------------------------------------------
  // 5. Prefer questions that haven't been seen in this set
  // ---------------------------------------------------------

  let availableQuestions = questions.filter(
    (question) => !excludedIds.has(question.id),
  );

  // ---------------------------------------------------------
  // 6. If we've exhausted the current set, allow repeats.
  //
  // If there is only one question, allow the current question
  // to repeat rather than returning an empty result.
  // ---------------------------------------------------------

  if (availableQuestions.length === 0) {
    availableQuestions = questions;
  }

  // ---------------------------------------------------------
  // 7. Create progress lookup
  // ---------------------------------------------------------

  const progressMap = new Map(
    (progress ?? []).map((item) => [item.question_id, item]),
  );

  // ---------------------------------------------------------
  // 8. Score questions
  //
  // Lower score = higher priority.
  // ---------------------------------------------------------

  const scoredQuestions = availableQuestions.map((question) => {
    const questionProgress = progressMap.get(question.id);

    // Never practiced → highest priority.
    if (!questionProgress) {
      return {
        question,
        score: 0,
      };
    }

    let score = 0;

    // Weak accuracy gets priority.
    if (questionProgress.accuracy < 70) {
      score -= 30;
    } else if (questionProgress.accuracy < 90) {
      score -= 15;
    }

    // Questions with fewer reps get priority.
    score += questionProgress.total_attempts * 2;

    // Recently practiced questions get deprioritized.
    if (questionProgress.last_attempted_at) {
      const daysSinceAttempt =
        (Date.now() - new Date(questionProgress.last_attempted_at).getTime()) /
        (1000 * 60 * 60 * 24);

      if (daysSinceAttempt < 1) {
        score += 20;
      } else if (daysSinceAttempt < 3) {
        score += 10;
      }
    }

    // Mastered questions appear much less frequently.
    if (questionProgress.mastery_level === "mastered") {
      score += 100;
    }

    return {
      question,
      score,
    };
  });

  // ---------------------------------------------------------
  // 9. Sort by priority
  // ---------------------------------------------------------

  scoredQuestions.sort((a, b) => a.score - b.score);

  // ---------------------------------------------------------
  // 10. Randomize among the top questions
  // ---------------------------------------------------------

  const topQuestions = scoredQuestions.slice(
    0,
    Math.min(5, scoredQuestions.length),
  );

  const selected =
    topQuestions[Math.floor(Math.random() * topQuestions.length)];

  // ---------------------------------------------------------
  // 11. Return selected question
  // ---------------------------------------------------------

  return {
    success: true,
    question: selected.question,
  };
}
