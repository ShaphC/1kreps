import { getProgress } from "./actions";

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string | number;
  detail?: string;
}) {
  return (
    <div className="min-w-0 rounded-lg border border-zinc-800 bg-black p-4 sm:p-5">
      <p className="truncate text-[11px] font-medium uppercase tracking-wide text-zinc-600">
        {label}
      </p>

      <p className="mt-1 text-2xl font-semibold text-zinc-100 sm:text-3xl">
        {value}
      </p>

      {detail && (
        <p className="mt-1 truncate text-xs text-zinc-600">{detail}</p>
      )}
    </div>
  );
}

function MasteryBadge({ level }: { level: string }) {
  const labels: Record<string, string> = {
    learning: "LEARNING",
    practicing: "PRACTICING",
    strong: "STRONG",
    mastered: "MASTERED",
  };

  const styles: Record<string, string> = {
    learning: "border-zinc-700 text-zinc-500",
    practicing: "border-yellow-900/50 text-yellow-500",
    strong: "border-blue-900/50 text-blue-400",
    mastered: "border-green-900/50 text-green-400",
  };

  return (
    <span
      className={`inline-flex rounded border px-2 py-1 text-[10px] font-medium tracking-wide ${
        styles[level] ?? "border-zinc-700 text-zinc-400"
      }`}
    >
      {labels[level] ?? level.toUpperCase()}
    </span>
  );
}

function AccuracyBar({ accuracy }: { accuracy: number }) {
  const safeAccuracy = Math.min(Math.max(accuracy, 0), 100);

  return (
    <div className="mt-3">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="text-[11px] uppercase tracking-wide text-zinc-600">
          Accuracy
        </span>

        <span className="font-mono text-xs text-zinc-400">{accuracy}%</span>
      </div>

      <div className="h-1.5 overflow-hidden rounded-full bg-zinc-900">
        <div
          className="h-full rounded-full bg-green-500 transition-all"
          style={{ width: `${safeAccuracy}%` }}
        />
      </div>
    </div>
  );
}

export default async function ProgressPage() {
  const result = await getProgress();

  if (!result.success || !result.progress) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 text-zinc-100">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-5">
            <p className="font-mono text-sm text-red-400">1000 REPS</p>

            <h1 className="mt-2 text-lg font-semibold">
              Unable to load progress
            </h1>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              {result.error ??
                "Something went wrong while loading your progress."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  const {
    totalReps,
    correctAnswers,
    incorrectAnswers,
    accuracy,
    questionsPracticed,
    questionsMastered,
    currentStreak,
    questions,
  } = result.progress;

  const masteryPercentage =
    questionsPracticed > 0
      ? Math.round((questionsMastered / questionsPracticed) * 100)
      : 0;

  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-950 px-4 py-5 text-zinc-100 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <header className="mb-6 sm:mb-8">
          <p className="font-mono text-xs text-zinc-600 sm:text-sm">
            1000 REPS
          </p>

          <h1 className="mt-1 text-xl font-semibold sm:text-2xl">
            Your Progress
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-5 text-zinc-500 sm:leading-6">
            See what you know, what you&apos;re improving, and what needs more
            reps.
          </p>
        </header>

        {/* Stats */}
        <section>
          <div className="mb-3">
            <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-600">
              Overview
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            <StatCard
              label="Total Reps"
              value={totalReps}
              detail="All attempts"
            />

            <StatCard
              label="Accuracy"
              value={`${accuracy}%`}
              detail={`${correctAnswers} correct`}
            />

            <StatCard
              label="Streak"
              value={currentStreak}
              detail={currentStreak === 1 ? "1 day" : "days"}
            />

            <StatCard
              label="Practiced"
              value={questionsPracticed}
              detail="Questions"
            />

            <StatCard
              label="Mastered"
              value={questionsMastered}
              detail={`${masteryPercentage}% of practiced`}
            />

            <StatCard
              label="Incorrect"
              value={incorrectAnswers}
              detail="Attempts"
            />
          </div>
        </section>

        {/* Performance */}
        <section className="mt-7 sm:mt-10">
          <div className="mb-3">
            <h2 className="text-xs font-medium uppercase tracking-wide text-zinc-600">
              Performance
            </h2>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-black p-4 sm:p-5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-xs text-zinc-600">Overall accuracy</p>

                <p className="mt-1 text-3xl font-semibold text-zinc-100 sm:text-4xl">
                  {accuracy}%
                </p>
              </div>

              <div className="text-right">
                <p className="font-mono text-xs text-green-400">
                  {correctAnswers} correct
                </p>

                <p className="mt-1 font-mono text-xs text-red-400">
                  {incorrectAnswers} incorrect
                </p>
              </div>
            </div>

            <AccuracyBar accuracy={accuracy} />
          </div>
        </section>

        {/* Question Progress */}
        <section className="mt-7 sm:mt-10">
          <div className="mb-3 sm:mb-4">
            <h2 className="text-base font-semibold sm:text-lg">
              Question Progress
            </h2>

            <p className="mt-1 text-xs leading-5 text-zinc-600 sm:text-sm">
              Questions that need more reps will naturally surface during
              practice.
            </p>
          </div>

          {questions.length === 0 ? (
            <div className="rounded-lg border border-zinc-800 bg-black p-6 text-center sm:p-8">
              <p className="font-mono text-xs text-zinc-600">NO REPS YET</p>

              <h3 className="mt-2 text-base font-medium text-zinc-300 sm:text-lg">
                Your progress starts here.
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-5 text-zinc-600">
                Complete your first practice session and your question-level
                progress will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {questions.map((item) => (
                <div
                  key={item.questionId}
                  className="overflow-hidden rounded-lg border border-zinc-800 bg-black"
                >
                  <div className="p-4 sm:p-5">
                    {/* Question + mastery */}
                    <div className="flex items-start gap-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm leading-6 text-zinc-300">
                          {item.questionText}
                        </p>

                        <div className="mt-2 overflow-x-auto">
                          <p className="w-max max-w-full break-all font-mono text-xs text-green-400 sm:text-sm">
                            {item.expectedAnswer}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <MasteryBadge level={item.masteryLevel} />
                      </div>
                    </div>

                    {/* Accuracy */}
                    <AccuracyBar accuracy={item.accuracy} />

                    {/* Mobile stats */}
                    <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-zinc-800 pt-4 sm:hidden">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          Reps
                        </p>

                        <p className="mt-1 font-mono text-xs text-zinc-300">
                          {item.totalAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          Correct
                        </p>

                        <p className="mt-1 font-mono text-xs text-green-400">
                          {item.correctAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          Incorrect
                        </p>

                        <p className="mt-1 font-mono text-xs text-red-400">
                          {item.incorrectAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          Recalls
                        </p>

                        <p className="mt-1 font-mono text-xs text-zinc-300">
                          {item.successfulRecalls}
                        </p>
                      </div>
                    </div>

                    {/* Desktop stats */}
                    <div className="mt-4 hidden grid-cols-4 gap-4 border-t border-zinc-800 pt-4 sm:grid">
                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          Reps
                        </p>

                        <p className="mt-1 font-mono text-sm text-zinc-300">
                          {item.totalAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          Correct
                        </p>

                        <p className="mt-1 font-mono text-sm text-green-400">
                          {item.correctAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          Incorrect
                        </p>

                        <p className="mt-1 font-mono text-sm text-red-400">
                          {item.incorrectAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase tracking-wide text-zinc-600">
                          Successful Recalls
                        </p>

                        <p className="mt-1 font-mono text-sm text-zinc-300">
                          {item.successfulRecalls}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
