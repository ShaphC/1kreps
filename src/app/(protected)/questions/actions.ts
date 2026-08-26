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
  const category = String(formData.get("category") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const caseSensitive = formData.get("caseSensitive") === "on";
  const isActive = formData.get("isActive") === "on";

  if (!questionText) {
    throw new Error("Question is required.");
  }

  if (!expectedAnswer) {
    throw new Error("Answer is required.");
  }

  if (!category) {
    throw new Error("Category is required.");
  }

  if (!topic) {
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
    category,
    topic,
    case_sensitive: caseSensitive,
    is_active: isActive,
    source_type: "user",
  });

  if (error) {
    console.error("Failed to create question:", error);
    throw new Error("Unable to create question.");
  }

  redirect("/questions");
}
