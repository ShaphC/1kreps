import Link from "next/link";
import { createQuestion } from "../actions";

export default function NewQuestionPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6">
          <Link
            href="/questions"
            className="text-sm text-zinc-500 transition hover:text-zinc-300"
          >
            ← Questions
          </Link>

          <p className="mt-6 font-mono text-sm text-zinc-500">1000 REPS</p>

          <h1 className="mt-1 text-2xl font-semibold">Add Question</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Add a specific question and answer you want to practice.
          </p>
        </div>

        <form
          action={createQuestion}
          className="space-y-5 rounded-lg border border-zinc-800 bg-black p-5 sm:p-6"
        >
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
              required
              rows={3}
              placeholder="What command creates a new Git branch and switches to it?"
              className="w-full resize-none rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
            />
          </div>

          <div>
            <label
              htmlFor="expectedAnswer"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Answer
            </label>

            <textarea
              id="expectedAnswer"
              name="expectedAnswer"
              required
              rows={2}
              placeholder="git switch -c branch-name"
              className="w-full resize-none rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3 font-mono text-sm text-green-400 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
            />
          </div>

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
              rows={3}
              placeholder={"One accepted answer per line\nAlternative answer"}
              className="w-full resize-none rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3 font-mono text-sm text-zinc-100 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
            />

            <p className="mt-2 text-xs text-zinc-600">
              Optional. Leave blank to use the main answer.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Category
              </label>

              <input
                id="category"
                name="category"
                required
                placeholder="Linux"
                className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
              />
            </div>

            <div>
              <label
                htmlFor="topic"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Topic
              </label>

              <input
                id="topic"
                name="topic"
                required
                placeholder="Users"
                className="min-h-11 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
              />
            </div>
          </div>

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
              rows={3}
              placeholder="Briefly explain what the command does."
              className="w-full resize-none rounded-md border border-zinc-800 bg-zinc-950 px-3 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-700 focus:border-zinc-600"
            />
          </div>

          <div className="space-y-3 border-t border-zinc-800 pt-5">
            <label className="flex min-h-11 items-center gap-3 text-sm text-zinc-400">
              <input
                type="checkbox"
                name="caseSensitive"
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-950"
              />
              Case sensitive
            </label>

            <label className="flex min-h-11 items-center gap-3 text-sm text-zinc-400">
              <input
                type="checkbox"
                name="isActive"
                defaultChecked
                className="h-4 w-4 rounded border-zinc-700 bg-zinc-950"
              />
              Active question
            </label>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
            <Link
              href="/questions"
              className="inline-flex min-h-11 items-center justify-center rounded-md border border-zinc-800 px-4 py-2 text-sm text-zinc-400 transition hover:bg-zinc-900 hover:text-zinc-200"
            >
              Cancel
            </Link>

            <button
              type="submit"
              className="min-h-11 rounded-md bg-zinc-100 px-5 py-2 text-sm font-medium text-zinc-950 transition hover:bg-white"
            >
              Add Question
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
