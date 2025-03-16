import {
  InterviewQuestion,
  InterviewQuestionType,
} from '@internship-app/types';

const getDefaultValues = (
  questions: InterviewQuestion[],
): { [key: string]: string } => {
  const defaultValueForQuestion = (q: InterviewQuestion) => {
    switch (q.type) {
      case InterviewQuestionType.Select:
        return q.details?.options ? q.details?.options[0] : '';
      case InterviewQuestionType.Slider:
        return q.details?.min && q.details?.max
          ? Math.floor((q.details?.min + q.details?.max) / 2)
          : '';
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

export const defaultInterviewValues = getDefaultValues([]);
