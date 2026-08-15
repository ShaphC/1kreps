export type MasteryLevel =
  | "learning"
  | "practicing"
  | "strong"
  | "mastered";

export function calculateMastery(
  successfulRecalls: number,
  accuracy: number
): MasteryLevel {
  if (successfulRecalls >= 25 && accuracy >= 90) {
    return "mastered";
  }

  if (successfulRecalls >= 15) {
    return "strong";
  }

  if (successfulRecalls >= 5) {
    return "practicing";
  }

  return "learning";
}