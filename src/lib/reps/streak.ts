export type AttemptDate = {
  created_at: string;
};

function getDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function calculateDailyStreak(
  attempts: AttemptDate[],
  now = new Date()
): number {
  if (attempts.length === 0) {
    return 0;
  }

  // Get unique practice days.
  const practiceDays = new Set(
    attempts.map((attempt) =>
      getDateKey(new Date(attempt.created_at))
    )
  );

  const today = getDateKey(now);

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const yesterdayKey = getDateKey(yesterday);

  // If the user hasn't practiced today or yesterday,
  // their current streak is 0.
  if (
    !practiceDays.has(today) &&
    !practiceDays.has(yesterdayKey)
  ) {
    return 0;
  }

  // Start from today if they practiced today.
  // Otherwise start from yesterday.
  const currentDate = new Date(
    practiceDays.has(today) ? now : yesterday
  );

  let streak = 0;

  while (practiceDays.has(getDateKey(currentDate))) {
    streak++;

    currentDate.setDate(
      currentDate.getDate() - 1
    );
  }

  return streak;
}