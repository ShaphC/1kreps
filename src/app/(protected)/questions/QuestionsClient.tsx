"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { deleteQuestion } from "./actions";

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

type QuestionsClientProps = {
  questions: Question[];
  initialCategory: string;
  initialTopic: string;
};

export default function QuestionsClient({
  questions,
  initialCategory,
  initialTopic,
}: QuestionsClientProps) {
  const router = useRouter();
  const pathname = usePathname();

  const [categoryFilter, setCategoryFilter] = useState(initialCategory);
  const [topicFilter, setTopicFilter] = useState(initialTopic);

  const [deletingQuestionId, setDeletingQuestionId] = useState<string | null>(
    null,
  );

  // ---------------------------------------------------------
  // SUBJECTS
  // ---------------------------------------------------------

  const subjects = useMemo(() => {
    return Array.from(
      new Map(
        questions
          .filter((question) => question.subject)
          .map((question) => [question.subject!.id, question.subject!]),
      ).values(),
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [questions]);

  // ---------------------------------------------------------
  // TOPICS
  // ---------------------------------------------------------

  const topics = useMemo(() => {
    const filteredQuestions = questions.filter((question) => {
      if (!categoryFilter) {
        return true;
      }

      return question.subject?.name === categoryFilter;
    });

    return Array.from(
      new Map(
        filteredQuestions
          .filter((question) => question.topic)
          .map((question) => [question.topic!.id, question.topic!]),
      ).values(),
    ).sort((a, b) => a.name.localeCompare(b.name));
  }, [questions, categoryFilter]);

  // ---------------------------------------------------------
  // FILTER QUESTIONS
  // ---------------------------------------------------------

  const filteredQuestions = useMemo(() => {
    return questions.filter((question) => {
      const matchesCategory =
        !categoryFilter || question.subject?.name === categoryFilter;

      const matchesTopic = !topicFilter || question.topic?.name === topicFilter;

      return matchesCategory && matchesTopic;
    });
  }, [questions, categoryFilter, topicFilter]);

  // ---------------------------------------------------------
  // URL
  // ---------------------------------------------------------

  const updateUrl = (category: string, topic: string) => {
    const params = new URLSearchParams();

    if (category) {
      params.set("category", category);
    }

    if (topic) {
      params.set("topic", topic);
    }

    const queryString = params.toString();

    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  // ---------------------------------------------------------
  // SUBJECT CHANGE
  // ---------------------------------------------------------

  const handleCategoryChange = (value: string) => {
    setCategoryFilter(value);

    let nextTopic = topicFilter;

    if (value && topicFilter) {
      const topicStillValid = questions.some(
        (question) =>
          question.subject?.name === value &&
          question.topic?.name === topicFilter,
      );

      if (!topicStillValid) {
        nextTopic = "";
        setTopicFilter("");
      }
    }

    updateUrl(value, nextTopic);
  };

  // ---------------------------------------------------------
  // TOPIC CHANGE
  // ---------------------------------------------------------

  const handleTopicChange = (value: string) => {
    setTopicFilter(value);
    updateUrl(categoryFilter, value);
  };

  // ---------------------------------------------------------
  // CLEAR FILTERS
  // ---------------------------------------------------------

  const clearFilters = () => {
    setCategoryFilter("");
    setTopicFilter("");

    router.replace(pathname, {
      scroll: false,
    });
  };

  // ---------------------------------------------------------
  // DELETE QUESTION
  // ---------------------------------------------------------

  const handleDelete = async (question: Question) => {
    if (deletingQuestionId) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this question? This cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    setDeletingQuestionId(question.id);

    try {
      await deleteQuestion(question.id);
    } catch (error) {
      console.error("Failed to delete question:", error);

      setDeletingQuestionId(null);

      window.alert("Unable to delete question. Please try again.");
    }
  };

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

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

        {/* STATS */}

        <div className="mb-6 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-zinc-800 bg-black p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-600">
              Total Questions
            </p>

            <p className="mt-2 font-mono text-2xl text-zinc-100">
              {questions.length}
            </p>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-black p-4">
            <p className="text-xs uppercase tracking-wide text-zinc-600">
              Subjects
            </p>

            <p className="mt-2 font-mono text-2xl text-zinc-100">
              {subjects.length}
            </p>
          </div>
        </div>

        {/* FILTERS */}

        <div className="mb-6 rounded-lg border border-zinc-800 bg-black p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            {/* SUBJECT */}

            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500"
              >
                Subject
              </label>

              <select
                id="category"
                value={categoryFilter}
                onChange={(event) => handleCategoryChange(event.target.value)}
                className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-zinc-600"
              >
                <option value="">All subjects</option>

                {subjects.map((subject) => (
                  <option key={subject.id} value={subject.name}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>

            {/* TOPIC */}

            <div>
              <label
                htmlFor="topic"
                className="mb-2 block text-xs font-medium uppercase tracking-wide text-zinc-500"
              >
                Topic
              </label>

              <select
                id="topic"
                value={topicFilter}
                onChange={(event) => handleTopicChange(event.target.value)}
                className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-zinc-600"
              >
                <option value="">All topics</option>

                {topics.map((topic) => (
                  <option key={topic.id} value={topic.name}>
                    {topic.name}
                  </option>
                ))}
              </select>
            </div>

            {/* CLEAR */}

            {(categoryFilter || topicFilter) && (
              <div className="sm:col-span-2">
                <button
                  type="button"
                  onClick={clearFilters}
                  className="min-h-11 px-1 text-sm text-zinc-500 transition hover:text-zinc-300"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>

        {/* QUESTION COUNT */}

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-zinc-500">
            {filteredQuestions.length}{" "}
            {filteredQuestions.length === 1 ? "question" : "questions"}
          </p>
        </div>

        {/* QUESTIONS */}

        {filteredQuestions.length === 0 ? (
          <div className="rounded-lg border border-zinc-800 bg-black p-8 text-center">
            <p className="text-zinc-400">No questions found.</p>

            <p className="mt-2 text-sm text-zinc-600">
              Try changing your filters or add a new question.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredQuestions.map((question) => {
              const subject = question.subject;
              const topic = question.topic;
              const isUserQuestion = question.source_type === "user";
              const isDeleting = deletingQuestionId === question.id;

              return (
                <div
                  key={question.id}
                  className="rounded-lg border border-zinc-800 bg-black p-4 sm:p-5"
                >
                  <div className="flex flex-col gap-4">
                    {/* SUBJECT + TOPIC */}

                    <div className="flex flex-wrap items-center gap-2">
                      {subject && (
                        <span className="rounded border border-zinc-700 px-2 py-1 text-xs text-zinc-400">
                          {subject.name}
                        </span>
                      )}

                      {topic && (
                        <span className="rounded border border-zinc-800 px-2 py-1 text-xs text-zinc-500">
                          {topic.name}
                        </span>
                      )}

                      {isUserQuestion && (
                        <span className="rounded border border-green-900/50 px-2 py-1 text-xs text-green-400">
                          YOUR QUESTION
                        </span>
                      )}

                      {!question.is_active && (
                        <span className="rounded border border-red-900/50 px-2 py-1 text-xs text-red-400">
                          INACTIVE
                        </span>
                      )}
                    </div>

                    {/* QUESTION */}

                    <div>
                      <p className="text-sm leading-6 text-zinc-200">
                        {question.question_text}
                      </p>

                      {/* ANSWER */}

                      <div className="mt-3 rounded-md border border-zinc-900 bg-zinc-950 p-3">
                        <p className="mb-1 text-xs uppercase tracking-wide text-zinc-600">
                          Answer
                        </p>

                        <p className="break-words font-mono text-sm text-green-400">
                          {question.expected_answer}
                        </p>
                      </div>

                      {/* EXPLANATION */}

                      {question.explanation && (
                        <p className="mt-3 text-sm leading-6 text-zinc-500">
                          {question.explanation}
                        </p>
                      )}

                      {/* ACTIONS */}

                      {isUserQuestion && (
                        <div className="mt-5 flex flex-col gap-2 border-t border-zinc-900 pt-4 sm:flex-row">
                          <Link
                            href={`/questions/${question.id}/edit`}
                            className="inline-flex min-h-10 items-center justify-center rounded-md border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
                          >
                            Edit
                          </Link>

                          <button
                            type="button"
                            onClick={() => handleDelete(question)}
                            disabled={deletingQuestionId !== null}
                            className="inline-flex min-h-10 items-center justify-center rounded-md border border-red-900/50 px-4 py-2 text-sm text-red-400 transition hover:bg-red-950/30 hover:text-red-300 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            {isDeleting ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
