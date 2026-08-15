import { calculateMastery, type MasteryLevel } from "./mastery";

type ProgressInput = {
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  currentStreak: number;
  successfulRecalls: number;
};

export type CalculatedProgress = {
  totalAttempts: number;
  correctAttempts: number;
  incorrectAttempts: number;
  accuracy: number;
  currentStreak: number;
  successfulRecalls: number;
  masteryLevel: MasteryLevel;
};

export function calculateProgress({
  totalAttempts,
  correctAttempts,
  incorrectAttempts,
  currentStreak,
  successfulRecalls,
}: ProgressInput): CalculatedProgress {
  const accuracy =
    totalAttempts === 0
      ? 0
      : Number(
          ((correctAttempts / totalAttempts) * 100).toFixed(2)
        );

  const masteryLevel = calculateMastery(
    successfulRecalls,
    accuracy
  );

  return {
    totalAttempts,
    correctAttempts,
    incorrectAttempts,
    accuracy,
    currentStreak,
    successfulRecalls,
    masteryLevel,
  };
}