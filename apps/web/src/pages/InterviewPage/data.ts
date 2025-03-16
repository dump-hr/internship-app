import { Question, QuestionType } from '@internship-app/types';

export const getDefaultValues = (
  questions: Question[],
): { [key: string]: string } => {
  const defaultValueForQuestion = (q: Question) => {
    switch (q.type) {
      case QuestionType.Select:
        return q.options?.[0] ?? '';
      case QuestionType.Slider:
        return Math.floor((q.minValue ?? 0) + (q.maxValue ?? 100) / 2);
      default:
        return '';
    }
  };

  return questions.reduce(
    (obj, q) => ({
      ...obj,
      [`${q.id}`]: {
        value: defaultValueForQuestion(q),
        tick: false,
      },
    }),
    {},
  );
};
