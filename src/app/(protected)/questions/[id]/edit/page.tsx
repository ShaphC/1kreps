import Link from "next/link";
import { notFound, redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { updateQuestion } from "../../actions";

type EditQuestionPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditQuestionPage({
  params,
}: EditQuestionPageProps) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
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
        difficulty,
        available_modes,
        case_sensitive,
        source_type,
        source_id,
        is_active,
        subject_id,
        topic_id
      `,
    )
    .eq("id", id)
    .single();

  if (questionError || !question) {
    notFound();
  }

  // Built-in questions cannot be edited by users.
  // User-created questions must belong to the current user.
  if (question.source_type !== "user" || question.source_id !== user.id) {
    notFound();
  }

  const { data: subjects, error: subjectsError } = await supabase
    .from("reps_subjects")
    .select("id, name")
    .order("name");

  if (subjectsError) {
    throw new Error("Unable to load subjects.");
  }

  const { data: topics, error: topicsError } = await supabase
    .from("reps_topics")
    .select("id, name, subject_id")
    .order("name");

  if (topicsError) {
    throw new Error("Unable to load topics.");
  }

  const acceptedAnswers = Array.isArray(question.accepted_answers)
    ? question.accepted_answers.join("\n")
    : "";

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-3xl">
        {/* HEADER */}

        <div className="mb-6">
          <Link
            href="/questions"
            className="text-sm text-zinc-500 transition hover:text-zinc-300"
          >
            ← Back to Questions
          </Link>

          <p className="mt-6 font-mono text-sm text-zinc-500">1000 REPS</p>

          <h1 className="mt-1 text-2xl font-semibold">Edit Question</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Update your question and practice settings.
          </p>
        </div>

        {/* FORM */}

        <form
          action={updateQuestion}
          className="space-y-6 rounded-lg border border-zinc-800 bg-black p-5 md:p-8"
        >
          <input type="hidden" name="id" value={question.id} />

          {/* QUESTION */}

          <div>
            <label
              htmlFor="questionText"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Question
            </label>

            <textarea
              id="questionText"
              name="questionText"
              defaultValue={question.question_text}
              required
              rows={5}
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
              placeholder="Enter your question..."
            />
          </div>

          {/* ANSWER */}

          <div>
            <label
              htmlFor="expectedAnswer"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Expected Answer
            </label>

            <input
              id="expectedAnswer"
              name="expectedAnswer"
              type="text"
              defaultValue={question.expected_answer}
              required
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3 font-mono text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
              placeholder="Enter the expected answer..."
            />
          </div>

          {/* ACCEPTED ANSWERS */}

          <div>
            <label
              htmlFor="acceptedAnswers"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Accepted Answers
            </label>

            <textarea
              id="acceptedAnswers"
              name="acceptedAnswers"
              defaultValue={acceptedAnswers}
              rows={4}
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3 font-mono text-sm text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
              placeholder={"One accepted answer per line..."}
            />

            <p className="mt-2 text-xs text-zinc-600">
              If left empty, the expected answer will be used.
            </p>
          </div>

          {/* EXPLANATION */}

          <div>
            <label
              htmlFor="explanation"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Explanation
            </label>

            <textarea
              id="explanation"
              name="explanation"
              defaultValue={question.explanation}
              rows={5}
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600"
              placeholder="Explain the answer..."
            />
          </div>

          {/* SUBJECT */}

          <div>
            <label
              htmlFor="subjectId"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Subject
            </label>

            <select
              id="subjectId"
              name="subjectId"
              defaultValue={question.subject_id}
              required
              className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-zinc-600"
            >
              <option value="">Select a subject</option>

              {(subjects ?? []).map((subject) => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          {/* TOPIC */}

          <div>
            <label
              htmlFor="topicId"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Topic
            </label>

            <select
              id="topicId"
              name="topicId"
              defaultValue={question.topic_id}
              required
              className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-zinc-600"
            >
              <option value="">Select a topic</option>

              {(topics ?? []).map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
          </div>

          {/* DIFFICULTY */}

          <div>
            <label
              htmlFor="difficulty"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Difficulty
            </label>

            <select
              id="difficulty"
              name="difficulty"
              defaultValue={question.difficulty}
              className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 text-sm text-zinc-100 outline-none focus:border-zinc-600"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* OPTIONS */}

          <div className="space-y-4 border-t border-zinc-800 pt-6">
            <label className="flex items-center gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="caseSensitive"
                defaultChecked={question.case_sensitive}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-950"
              />

              <span>Case sensitive</span>
            </label>

            <label className="flex items-center gap-3 text-sm text-zinc-300">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked={question.is_active}
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-950"
              />

              <span>Active</span>
            </label>
          </div>

          {/* ACTIONS */}

          <div className="flex flex-col gap-3 border-t border-zinc-800 pt-6 sm:flex-row sm:justify-end">
            <Link
              href="/questions"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-md bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 transition hover:bg-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
