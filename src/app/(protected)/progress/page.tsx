import { getProgress } from "./actions";

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
      <p className="text-sm text-zinc-500">{label}</p>

      <p className="mt-2 text-3xl font-semibold text-zinc-100">{value}</p>
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
    <span className="rounded border border-zinc-700 px-2 py-1 text-xs font-medium text-zinc-400">
      {labels[level] ?? level.toUpperCase()}
    </span>
  );
}

export default async function ProgressPage() {
  const result = await getProgress();

  if (!result.success || !result.progress) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-zinc-950 px-6 text-zinc-100">
        <div className="w-full max-w-md">
          <div className="rounded-lg border border-red-900/50 bg-red-950/30 p-6">
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
    <main className="min-h-screen bg-zinc-950 p-4 text-zinc-100 md:p-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm text-zinc-500">LINUX</p>

          <h1 className="mt-1 text-2xl font-semibold">Your Progress</h1>

          <p className="mt-2 text-sm text-zinc-500">
            Keep getting the reps in until it becomes second nature.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Total Reps" value={totalReps} />
          <StatCard label="Correct Answers" value={correctAnswers} />
          <StatCard label="Accuracy" value={`${accuracy}%`} />
          <StatCard label="Questions Practiced" value={questionsPracticed} />
          <StatCard label="Questions Mastered" value={questionsMastered} />
          <StatCard label="Current Streak" value={currentStreak} />
        </div>

        <div className="mt-10">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Linux Commands</h2>

            <p className="mt-1 text-sm text-zinc-500">
              Your progress by question.
            </p>
          </div>

          {questions.length === 0 ? (
            <div className="rounded-lg border border-zinc-800 bg-black p-8 text-center">
              <p className="text-zinc-400">
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
                  <div key={item.questionId} className="p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="min-w-0">
                        <p className="text-sm leading-6 text-zinc-300">
                          {item.questionText}
                        </p>

                        <p className="mt-2 font-mono text-green-400">
                          {item.expectedAnswer}
                        </p>
                      </div>

                      <MasteryBadge level={item.masteryLevel} />
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
                      <div>
                        <p className="text-zinc-600">Reps</p>
                        <p className="mt-1 text-zinc-300">
                          {item.totalAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-zinc-600">Correct</p>
                        <p className="mt-1 text-zinc-300">
                          {item.correctAttempts}
                        </p>
                      </div>

                      <div>
                        <p className="text-zinc-600">Accuracy</p>
                        <p className="mt-1 text-zinc-300">{item.accuracy}%</p>
                      </div>

                      <div>
                        <p className="text-zinc-600">Recalls</p>
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
        </div>
      </div>
    </main>
  );
}
