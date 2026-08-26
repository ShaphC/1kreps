import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

type Question = {
  id: string;
  question_text: string;
  expected_answer: string;
  explanation: string;
  category: string | null;
  topic: string | null;
  is_active: boolean;
};

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
      category,
      topic,
      is_active
    `,
    )
    .order("category", { ascending: true })
    .order("topic", { ascending: true })
    .order("question_text", { ascending: true });

  if (error) {
    console.error("Failed to load questions:", error);

    throw new Error("Unable to load questions.");
  }

  const allQuestions = (questions ?? []) as Question[];

  const categories = Array.from(
    new Set(
      allQuestions
        .map((question) => question.category)
        .filter((category): category is string => Boolean(category)),
    ),
  ).sort();

  const topics = Array.from(
    new Set(
      allQuestions
        .filter(
          (question) => !categoryFilter || question.category === categoryFilter,
        )
        .map((question) => question.topic)
        .filter((topic): topic is string => Boolean(topic)),
    ),
  ).sort();

  const filteredQuestions = allQuestions.filter((question) => {
    const matchesCategory =
      !categoryFilter || question.category === categoryFilter;

    const matchesTopic = !topicFilter || question.topic === topicFilter;

    return matchesCategory && matchesTopic;
  });

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-sm text-zinc-500">1000 REPS</p>

            <h1 className="mt-1 text-2xl font-semibold">Questions</h1>

            <p className="mt-2 text-sm text-zinc-500">Your question library.</p>
          </div>

          <Link
            href="/questions/new"
            className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-white"
          >
            + Add Question
          </Link>
        </div>

        <div className="mb-6 rounded-lg border border-zinc-800 bg-black p-4">
          <form method="GET" className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500"
              >
                Category
              </label>

              <select
                id="category"
                name="category"
                defaultValue={categoryFilter}
                className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-zinc-600"
              >
                <option value="">All categories</option>

                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="topic"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500"
              >
                Topic
              </label>

              <select
                id="topic"
                name="topic"
                defaultValue={topicFilter}
                className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-zinc-600"
              >
                <option value="">All topics</option>

                {topics.map((topic) => (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2 flex flex-col gap-2 sm:flex-row">
              <button
                type="submit"
                className="min-h-11 rounded-md border border-zinc-700 px-4 py-2 text-sm font-medium transition hover:bg-zinc-900"
              >
                Filter
              </button>

              {(categoryFilter || topicFilter) && (
                <Link
                  href="/questions"
                  className="inline-flex min-h-11 items-center justify-center rounded-md px-4 py-2 text-sm text-zinc-500 transition hover:text-zinc-300"
                >
                  Clear filters
                </Link>
              )}
            </div>
          </form>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {filteredQuestions.length}{" "}
            {filteredQuestions.length === 1 ? "question" : "questions"}
          </p>
        </div>

        {filteredQuestions.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-black p-8 text-center">
            <p className="text-zinc-400">No questions found.</p>

            <p className="mt-2 text-sm text-zinc-600">
              Try changing your filters or add a new question.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
                className="rounded-lg border border-zinc-800 bg-black p-4 sm:p-5"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex flex-wrap items-center gap-2">
                    {question.category && (
                      <span className="rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400">
                        {question.category}
                      </span>
                    )}

                    {question.topic && (
                      <span className="rounded border border-zinc-800 px-2 py-1 text-xs text-zinc-500">
                        {question.topic}
                      </span>
                    )}

                    {!question.is_active && (
                      <span className="rounded border border-red-900/50 px-2 py-1 text-xs text-red-400">
                        INACTIVE
                      </span>
                    )}
                  </div>

                  <div>
                    <p className="text-sm leading-6 text-zinc-200">
                      {question.question_text}
                    </p>

                    <div className="mt-3 rounded-md border border-zinc-900 bg-zinc-950 p-3">
                      <p className="mb-1 text-xs uppercase tracking-wide text-zinc-600">
                        Answer
                      </p>

                      <p className="break-words font-mono text-sm text-green-400">
                        {question.expected_answer}
                      </p>
                    </div>

                    {question.explanation && (
                      <p className="mt-3 text-sm leading-6 text-zinc-500">
                        {question.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
