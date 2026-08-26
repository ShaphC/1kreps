import { createClient } from "@/lib/supabase/server";
import QuestionsClient from "./QuestionsClient";

type Subject = {
  id: string;
  name: string;
};

type Topic = {
  id: string;
  name: string;
};

type Question = {
  id: string;
  question_text: string;
  expected_answer: string;
  explanation: string;
  is_active: boolean;
  source_type: string;
  source_id: string | null;
  subject: Subject | null;
  topic: Topic | null;
};

type SupabaseRelationship<T> = T | T[] | null;

export default async function QuestionsPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    topic?: string;
  }>;
}) {
  const params = await searchParams;

  const categoryFilter = params.category ?? "";
  const topicFilter = params.topic ?? "";

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: questions, error } = await supabase
    .from("reps_questions")
    .select(
      `
        id,
        question_text,
        expected_answer,
        explanation,
        is_active,
        source_type,
        source_id,
        subject:reps_subjects (
          id,
          name
        ),
        topic:reps_topics (
          id,
          name
        )
      `,
    )
    .order("question_text", { ascending: true });

  if (error) {
    console.error("Failed to load questions:", error);
    throw new Error("Unable to load questions.");
  }

  const normalizedQuestions: Question[] = (questions ?? []).map((question) => {
    const subject = question.subject as SupabaseRelationship<Subject>;
    const topic = question.topic as SupabaseRelationship<Topic>;

    return {
      id: question.id,
      question_text: question.question_text,
      expected_answer: question.expected_answer,
      explanation: question.explanation,
      is_active: question.is_active,
      source_type: question.source_type,
      source_id: question.source_id,
      subject: Array.isArray(subject)
        ? (subject[0] ?? null)
        : (subject ?? null),
      topic: Array.isArray(topic) ? (topic[0] ?? null) : (topic ?? null),
    };
  });

  return (
    <QuestionsClient
      questions={normalizedQuestions}
      initialCategory={categoryFilter}
      initialTopic={topicFilter}
    />
  );
}
