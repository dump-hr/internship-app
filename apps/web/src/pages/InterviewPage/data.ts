import { Question, QuestionType } from '@internship-app/types';

// import { useFetchAllInterviewQuestions } from '../../api/usefetchAllInterviewQuestions.tsx';

const getDefaultValues = (questions: Question[]): { [key: string]: string } => {
  const defaultValueForQuestion = (q: Question) => {
    switch (q.type) {
      case QuestionType.Select:
        return q.options[0];
      case QuestionType.Slider:
        return Math.floor((q.min + q.max) / 2);
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

export const defaultInterviewValues = getDefaultValues(interviewQuestions);
