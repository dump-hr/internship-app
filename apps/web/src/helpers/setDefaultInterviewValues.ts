import {
  Question,
  QuestionType,
} from '@internship-app/types';

export const getDefaultValues = (
  questions: Question[],
): { [key: string]: string } => {
  const defaultValueForQuestion = (q: Question) => {
    switch (q.type) {
      case QuestionType.Select:
        return q.options[0];
      case QuestionType.Slider:
        if (q.min && q.max) return Math.floor((q.min + q.max) / 2);
        return '';
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
