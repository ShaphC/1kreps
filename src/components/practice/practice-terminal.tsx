"use client";

import { FormEvent, useState } from "react";
import { getNextQuestion, submitAnswer } from "@/app/practice/actions";

type Question = {
  id: string;
  question_text: string;
  expected_answer: string;
  accepted_answers: string[];
  explanation: string;
  case_sensitive: boolean;
};

export default function PracticeTerminal({ question }: { question: Question }) {
  const [currentQuestion, setCurrentQuestion] = useState<Question>(question);

  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!answer.trim() || submitting) {
      return;
    }

    setSubmitting(true);
    setError("");

    const result = await submitAnswer({
      questionId: currentQuestion.id,
      submittedAnswer: answer,
      practiceMode: "recall",
    });

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
      setSubmitting(false);
      return;
    }

    setCorrect(result.correct);
    setExpectedAnswer(result.expectedAnswer);
    setExplanation(result.explanation);
    setSubmitted(true);
    setSubmitting(false);
  }

  async function handleNextQuestion() {
    if (submitting) {
      return;
    }

    setSubmitting(true);
    setError("");

    const result = await getNextQuestion(currentQuestion.id);

    if (!result.success || !result.question) {
      setError(result.error ?? "Unable to load the next question.");
      setSubmitting(false);
      return;
    }

    setCurrentQuestion(result.question);

    setAnswer("");
    setSubmitted(false);
    setCorrect(false);
    setExpectedAnswer("");
    setExplanation("");
    setError("");
    setSubmitting(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-zinc-500">LINUX</p>

            <h1 className="text-xl font-semibold">Today&apos;s Reps</h1>
          </div>

          <div className="font-mono text-sm text-zinc-500">1 / 10</div>
        </div>

        {/* Terminal */}
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-zinc-800 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />

            <span className="ml-3 font-mono text-xs text-zinc-500">
              user@reps:~
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-5 font-mono md:p-8">
            {/* Question */}
            <div className="mb-8 text-base leading-7 text-zinc-300 md:text-lg">
              {currentQuestion.question_text}
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-md border border-red-900/50 bg-red-950/30 p-3 text-sm text-red-400">
                {error}
              </div>
            )}

            {/* Answer */}
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-green-400">user@reps:~$</span>

                  <input
                    autoFocus
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent text-zinc-100 outline-none"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Your answer"
                    disabled={submitting}
                  />

                  <span className="shrink-0 text-zinc-500">
                    {submitting ? "..." : "▌"}
                  </span>
                </div>
              </form>
            ) : (
              /* Feedback */
              <div className="space-y-5">
                {/* Submitted command */}
                <div className="break-all">
                  <span className="text-green-400">user@reps:~$</span> {answer}
                </div>

                {/* Result */}
                <div
                  className={
                    correct
                      ? "border-l-2 border-green-500 pl-4"
                      : "border-l-2 border-red-500 pl-4"
                  }
                >
                  <p className="font-semibold">
                    {correct ? "✓ Correct" : "✗ Incorrect"}
                  </p>

                  {!correct && (
                    <p className="mt-2 text-zinc-300">
                      Correct answer:{" "}
                      <span className="text-green-400">{expectedAnswer}</span>
                    </p>
                  )}

                  <p className="mt-2 text-sm text-zinc-500">{explanation}</p>
                </div>

                {/* Next question */}
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={submitting}
                  className="rounded-md border border-zinc-700 px-4 py-2 text-sm transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? "Loading..." : "Next Question →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
