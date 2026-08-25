"use client";

import { FormEvent, useState } from "react";
import {
  getNextQuestion,
  submitAnswer,
} from "@/app/(protected)/practice/actions";

const SESSION_SIZE = 10;

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

  const [questionNumber, setQuestionNumber] = useState(1);
  const [sessionCorrect, setSessionCorrect] = useState(0);
  const [sessionIncorrect, setSessionIncorrect] = useState(0);

  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [expectedAnswer, setExpectedAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [error, setError] = useState("");

  const [submittingAnswer, setSubmittingAnswer] = useState(false);
  const [loadingNextQuestion, setLoadingNextQuestion] = useState(false);

  const [sessionComplete, setSessionComplete] = useState(false);

  const busy = submittingAnswer || loadingNextQuestion;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!answer.trim() || busy) {
      return;
    }

    setSubmittingAnswer(true);
    setError("");

    const result = await submitAnswer({
      questionId: currentQuestion.id,
      submittedAnswer: answer,
      practiceMode: "recall",
    });

    if (!result.success) {
      setError(result.error ?? "Something went wrong.");
      setSubmittingAnswer(false);
      return;
    }

    setCorrect(result.correct);
    setExpectedAnswer(result.expectedAnswer);
    setExplanation(result.explanation);
    setSubmitted(true);

    if (result.correct) {
      setSessionCorrect((value) => value + 1);
    } else {
      setSessionIncorrect((value) => value + 1);
    }

    setSubmittingAnswer(false);
  }

  async function handleNextQuestion() {
    if (busy) {
      return;
    }

    if (questionNumber >= SESSION_SIZE) {
      setSessionComplete(true);
      return;
    }

    setLoadingNextQuestion(true);
    setError("");

    const result = await getNextQuestion(currentQuestion.id);

    if (!result.success || !result.question) {
      setError(result.error ?? "Unable to load the next question.");
      setLoadingNextQuestion(false);
      return;
    }

    setCurrentQuestion(result.question);
    setQuestionNumber((value) => value + 1);

    setAnswer("");
    setSubmitted(false);
    setCorrect(false);
    setExpectedAnswer("");
    setExplanation("");
    setError("");

    setLoadingNextQuestion(false);
  }

  const sessionAccuracy =
    sessionCorrect + sessionIncorrect > 0
      ? Math.round((sessionCorrect / (sessionCorrect + sessionIncorrect)) * 100)
      : 0;

  // ---------------------------------------------------------
  // Session complete
  // ---------------------------------------------------------

  if (sessionComplete) {
    return (
      <main className="min-h-screen bg-zinc-950 px-3 py-4 text-zinc-100 sm:p-4 md:p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-5 sm:mb-6">
            <p className="text-sm text-zinc-500">LINUX</p>

            <h1 className="text-lg font-semibold sm:text-xl">
              Today&apos;s Reps
            </h1>
          </div>

          <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-2xl">
            <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-3 sm:px-4">
              <div className="h-3 w-3 shrink-0 rounded-full bg-red-500" />
              <div className="h-3 w-3 shrink-0 rounded-full bg-yellow-500" />
              <div className="h-3 w-3 shrink-0 rounded-full bg-green-500" />

              <span className="ml-2 truncate font-mono text-xs text-zinc-500 sm:ml-3">
                user@reps:~
              </span>
            </div>

            <div className="p-5 font-mono sm:p-6 md:p-10">
              <div className="mb-7 sm:mb-8">
                <p className="text-xs text-zinc-500 sm:text-sm">
                  SESSION COMPLETE
                </p>

                <h2 className="mt-2 text-xl font-semibold text-zinc-100 sm:text-2xl">
                  Today&apos;s Reps
                </h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="rounded-md border border-zinc-800 p-4">
                  <p className="text-sm text-zinc-500">Questions</p>

                  <p className="mt-2 text-2xl font-semibold">{SESSION_SIZE}</p>
                </div>

                <div className="rounded-md border border-zinc-800 p-4">
                  <p className="text-sm text-zinc-500">Correct</p>

                  <p className="mt-2 text-2xl font-semibold text-green-400">
                    {sessionCorrect}
                  </p>
                </div>

                <div className="rounded-md border border-zinc-800 p-4">
                  <p className="text-sm text-zinc-500">Accuracy</p>

                  <p className="mt-2 text-2xl font-semibold">
                    {sessionAccuracy}%
                  </p>
                </div>
              </div>

              <div className="mt-7 border-t border-zinc-800 pt-6 sm:mt-8">
                <p className="text-zinc-500">Incorrect</p>

                <p className="mt-1 text-zinc-300">{sessionIncorrect}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ---------------------------------------------------------
  // Practice screen
  // ---------------------------------------------------------

  return (
    <main className="min-h-screen bg-zinc-950 px-3 py-4 text-zinc-100 sm:p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div className="min-w-0">
            <p className="text-xs text-zinc-500 sm:text-sm">LINUX</p>

            <h1 className="text-lg font-semibold sm:text-xl">
              Today&apos;s Reps
            </h1>
          </div>

          <div className="shrink-0 font-mono text-xs text-zinc-500 sm:text-sm">
            {questionNumber} / {SESSION_SIZE}
          </div>
        </div>

        {/* Terminal */}
        <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black shadow-2xl">
          {/* Terminal header */}
          <div className="flex items-center gap-2 border-b border-zinc-800 px-3 py-3 sm:px-4">
            <div className="h-3 w-3 shrink-0 rounded-full bg-red-500" />
            <div className="h-3 w-3 shrink-0 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 shrink-0 rounded-full bg-green-500" />

            <span className="ml-2 truncate font-mono text-xs text-zinc-500 sm:ml-3">
              user@reps:~
            </span>
          </div>

          {/* Terminal content */}
          <div className="p-4 font-mono sm:p-5 md:p-8">
            {/* Question */}
            <div className="mb-7 text-sm leading-7 text-zinc-300 sm:mb-8 sm:text-base md:text-lg">
              {currentQuestion.question_text}
            </div>

            {/* Error */}
            {error && (
              <div className="mb-5 rounded-md border border-red-900/50 bg-red-950/30 p-3 text-sm leading-6 text-red-400">
                {error}
              </div>
            )}

            {/* Answer */}
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="flex items-start gap-2">
                  <span className="shrink-0 pt-2 text-xs text-green-400 sm:text-sm">
                    user@reps:~$
                  </span>

                  <input
                    autoFocus
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value)}
                    className="min-w-0 flex-1 bg-transparent py-2 text-sm leading-6 text-zinc-100 outline-none placeholder:text-zinc-700 sm:text-base"
                    autoComplete="off"
                    spellCheck={false}
                    aria-label="Your answer"
                    disabled={busy}
                  />

                  <span className="shrink-0 pt-2 text-zinc-500">
                    {submittingAnswer ? "..." : "▌"}
                  </span>
                </div>
              </form>
            ) : (
              /* Feedback */
              <div className="space-y-5">
                {/* Submitted command */}
                <div className="break-words text-sm leading-6 sm:text-base">
                  <span className="text-green-400">user@reps:~$</span> {answer}
                </div>

                {/* Result */}
                <div
                  className={
                    correct
                      ? "border-l-2 border-green-500 pl-3 sm:pl-4"
                      : "border-l-2 border-red-500 pl-3 sm:pl-4"
                  }
                >
                  <p className="font-semibold">
                    {correct ? "✓ Correct" : "✗ Incorrect"}
                  </p>

                  {!correct && (
                    <p className="mt-2 text-sm leading-6 text-zinc-300">
                      Correct answer:{" "}
                      <span className="break-words text-green-400">
                        {expectedAnswer}
                      </span>
                    </p>
                  )}

                  <p className="mt-2 text-sm leading-6 text-zinc-500">
                    {explanation}
                  </p>
                </div>

                {/* Next question */}
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={busy}
                  className="w-full rounded-md border border-zinc-700 px-4 py-3 text-sm transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:py-2"
                >
                  {loadingNextQuestion
                    ? "Loading next question..."
                    : questionNumber >= SESSION_SIZE
                      ? "Finish Session →"
                      : "Next Question →"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
