"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function createQuestion(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const questionText = String(formData.get("questionText") ?? "").trim();
  const expectedAnswer = String(formData.get("expectedAnswer") ?? "").trim();

  const acceptedAnswersRaw = String(
    formData.get("acceptedAnswers") ?? "",
  ).trim();

  const explanation = String(formData.get("explanation") ?? "").trim();

  const subjectId = String(formData.get("subjectId") ?? "").trim();
  const topicId = String(formData.get("topicId") ?? "").trim();

  const difficulty =
    String(formData.get("difficulty") ?? "beginner").trim() || "beginner";

  const caseSensitive = formData.get("caseSensitive") === "on";
  const isActive = formData.get("isActive") === "on";

  if (!questionText) {
    throw new Error("Question is required.");
  }

  if (!expectedAnswer) {
    throw new Error("Answer is required.");
  }

  if (!subjectId) {
    throw new Error("Subject is required.");
  }

  if (!topicId) {
    throw new Error("Topic is required.");
  }

  const acceptedAnswers = acceptedAnswersRaw
    ? acceptedAnswersRaw
        .split("\n")
        .map((answer) => answer.trim())
        .filter(Boolean)
    : [expectedAnswer];

  const { error } = await supabase.from("reps_questions").insert({
    question_text: questionText,
    expected_answer: expectedAnswer,
    accepted_answers: acceptedAnswers,
    explanation,
    subject_id: subjectId,
    topic_id: topicId,
    difficulty,
    case_sensitive: caseSensitive,
    is_active: isActive,
    source_type: "user",
    source_id: user.id,
  });

  if (error) {
    console.error("Failed to create question:", error);
    throw new Error("Unable to create question.");
  }

  redirect("/questions");
}

export async function updateQuestion(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ---------------------------------------------------------
  // 1. Get question ID
  // ---------------------------------------------------------

  const questionId = String(formData.get("id") ?? "").trim();

  if (!questionId) {
    throw new Error("Question ID is required.");
  }

  // ---------------------------------------------------------
  // 2. Verify the question exists and belongs to the user
  // ---------------------------------------------------------

  const { data: existingQuestion, error: questionError } = await supabase
    .from("reps_questions")
    .select("id, source_type, source_id")
    .eq("id", questionId)
    .single();

  if (questionError || !existingQuestion) {
    throw new Error("Question not found.");
  }

  if (
    existingQuestion.source_type !== "user" ||
    existingQuestion.source_id !== user.id
  ) {
    throw new Error("You do not have permission to edit this question.");
  }

  // ---------------------------------------------------------
  // 3. Get form values
  // ---------------------------------------------------------

  const questionText = String(formData.get("questionText") ?? "").trim();

  const expectedAnswer = String(formData.get("expectedAnswer") ?? "").trim();

  const acceptedAnswersRaw = String(
    formData.get("acceptedAnswers") ?? "",
  ).trim();

  const explanation = String(formData.get("explanation") ?? "").trim();

  const subjectId = String(formData.get("subjectId") ?? "").trim();

  const topicId = String(formData.get("topicId") ?? "").trim();

  const difficulty =
    String(formData.get("difficulty") ?? "beginner").trim() || "beginner";

  const caseSensitive = formData.get("caseSensitive") === "on";
  const isActive = formData.get("isActive") === "on";

  // ---------------------------------------------------------
  // 4. Validate values
  // ---------------------------------------------------------

  if (!questionText) {
    throw new Error("Question is required.");
  }

  if (!expectedAnswer) {
    throw new Error("Answer is required.");
  }

  if (!subjectId) {
    throw new Error("Subject is required.");
  }

  if (!topicId) {
    throw new Error("Topic is required.");
  }

  const acceptedAnswers = acceptedAnswersRaw
    ? acceptedAnswersRaw
        .split("\n")
        .map((answer) => answer.trim())
        .filter(Boolean)
    : [expectedAnswer];

  // ---------------------------------------------------------
  // 5. Update question
  //
  // RLS also enforces:
  // source_type = 'user'
  // source_id = auth.uid()
  // ---------------------------------------------------------

  const { error: updateError } = await supabase
    .from("reps_questions")
    .update({
      question_text: questionText,
      expected_answer: expectedAnswer,
      accepted_answers: acceptedAnswers,
      explanation,
      subject_id: subjectId,
      topic_id: topicId,
      difficulty,
      case_sensitive: caseSensitive,
      is_active: isActive,
    })
    .eq("id", questionId);

  if (updateError) {
    console.error("Failed to update question:", updateError);
    throw new Error("Unable to update question.");
  }

  redirect("/questions");
}

export async function deleteQuestion(questionId: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // ---------------------------------------------------------
  // 1. Validate question ID
  // ---------------------------------------------------------

  const id = String(questionId ?? "").trim();

  if (!id) {
    throw new Error("Question ID is required.");
  }

  // ---------------------------------------------------------
  // 2. Verify ownership before deleting
  // ---------------------------------------------------------

  const { data: existingQuestion, error: questionError } = await supabase
    .from("reps_questions")
    .select("id, source_type, source_id")
    .eq("id", id)
    .single();

  if (questionError || !existingQuestion) {
    throw new Error("Question not found.");
  }

  if (
    existingQuestion.source_type !== "user" ||
    existingQuestion.source_id !== user.id
  ) {
    throw new Error("You do not have permission to delete this question.");
  }

  // ---------------------------------------------------------
  // 3. Delete question
  //
  // RLS also enforces ownership at the database level.
  // ---------------------------------------------------------

  const { error: deleteError } = await supabase
    .from("reps_questions")
    .delete()
    .eq("id", id);

  if (deleteError) {
    console.error("Failed to delete question:", deleteError);
    throw new Error("Unable to delete question.");
  }

  redirect("/questions");
}
