import { getProgress } from "./actions";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="min-w-0 rounded-lg border border-zinc-800 bg-zinc-950 p-4 sm:p-5">
      <p className="text-xs text-zinc-500 sm:text-sm">{label}</p>

      <p className="mt-2 text-2xl font-semibold text-zinc-100 sm:text-3xl">
        {value}
      </p>
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

  return (
    <span className="w-fit shrink-0 rounded border border-zinc-700 px-2 py-1 text-[10px] font-medium text-zinc-400 sm:text-xs">
      {labels[level] ?? level.toUpperCase()}
    </span>
  );
}

export default async function ProgressPage() {
  const result = await getProgress();

  if (!result.success || !result.progress) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-6">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-5 sm:p-6">
            <p className="font-mono text-sm text-red-400">1000 REPS</p>

            <h1 className="mt-2 text-xl font-semibold">
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-950 px-4 py-6 text-zinc-100 sm:p-6 md:p-8">
      <div className="mx-auto w-full max-w-5xl">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <p className="text-xs text-zinc-500 sm:text-sm">LINUX</p>

          <h1 className="mt-1 text-xl font-semibold sm:text-2xl">
            Your Progress
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-500">
            Keep getting the reps in until it becomes second nature.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          <StatCard label="Total Reps" value={totalReps} />

          <StatCard label="Correct Answers" value={correctAnswers} />

          <StatCard label="Accuracy" value={`${accuracy}%`} />

          <StatCard label="Questions Practiced" value={questionsPracticed} />

          <StatCard label="Questions Mastered" value={questionsMastered} />

          <StatCard label="Current Streak" value={currentStreak} />
        </div>

        {/* Question progress */}
        <section className="mt-8 sm:mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Linux Commands</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your progress by question.
            </p>
          </div>

          {questions.length === 0 ? (
            <div className="rounded-lg border border-zinc-800 bg-black p-6 text-center sm:p-8">
              <p className="text-sm text-zinc-400">
                You haven&apos;t completed any reps yet.
              </p>

              <p className="mt-2 text-sm text-zinc-600">
                Start practicing to see your progress here.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-zinc-800 bg-black">
              <div className="divide-y divide-zinc-800">
                {questions.map((item) => (
                  <div key={item.questionId} className="min-w-0 p-4 sm:p-5">
                    {/* Question header */}
                    <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0">
                        <p className="break-words text-sm leading-6 text-zinc-300">
                          {item.questionText}
                        </p>

                        <p className="mt-2 break-all font-mono text-sm text-green-400">
                          {item.expectedAnswer}
                        </p>
                      </div>

                      <MasteryBadge level={item.masteryLevel} />
                    </div>

                    {/* Question stats */}
                    <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4 border-t border-zinc-900 pt-4 text-sm sm:grid-cols-4 sm:gap-4 sm:border-0 sm:pt-0">
                      <div>
                        <p className="text-xs text-zinc-600 sm:text-sm">Reps</p>

                        <p className="mt-1 text-zinc-300">
                          {item.totalAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600 sm:text-sm">
                          Correct
                        </p>

                        <p className="mt-1 text-zinc-300">
                          {item.correctAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600 sm:text-sm">
                          Accuracy
                        </p>

                        <p className="mt-1 text-zinc-300">{item.accuracy}%</p>
                      </div>

                      <div>
                        <p className="text-xs text-zinc-600 sm:text-sm">
                          Recalls
                        </p>

                        <p className="mt-1 text-zinc-300">
                          {item.successfulRecalls}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
