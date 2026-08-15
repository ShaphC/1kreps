type ValidateAnswerOptions = {
  submittedAnswer: string;
  acceptedAnswers: string[];
  caseSensitive?: boolean;
};

export function normalizeAnswer(
  answer: string,
  caseSensitive = true
) {
  const normalized = answer.trim().replace(/\s+/g, " ");

  return caseSensitive
    ? normalized
    : normalized.toLowerCase();
}

export function validateAnswer({
  submittedAnswer,
  acceptedAnswers,
  caseSensitive = true,
}: ValidateAnswerOptions) {
  const normalizedSubmitted = normalizeAnswer(
    submittedAnswer,
    caseSensitive
  );

  return acceptedAnswers.some(
    (answer) =>
      normalizeAnswer(answer, caseSensitive) === normalizedSubmitted
  );
}