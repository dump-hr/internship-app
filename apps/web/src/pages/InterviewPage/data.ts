import {
  MultistepQuestion,
  Question,
  QuestionType,
} from '@internship-app/types';

import { QuestionCategory } from '../../constants/interviewConstants';

export const interviewQuestions: Array<MultistepQuestion<QuestionCategory>> = [
  {
    id: 'p1',
    title: 'Dobar dan',
    type: QuestionType.Field,
    category: QuestionCategory.General,
  },
  {
    id: 'p2',
    title: 'Motivacija?',
    type: QuestionType.TextArea,
    category: QuestionCategory.General,
  },
  {
    id: 'p3',
    title: 'Neki slider?',
    type: QuestionType.Slider,
    category: QuestionCategory.General,
    min: 0,
    max: 10,
    step: 1,
  },
  {
    id: 'p4',
    title: 'Neko dev pitanje',
    type: QuestionType.Field,
    category: QuestionCategory.Development,
  },
  {
    id: 'p5',
    title: 'Koliko vremena dnevno gubiš',
    type: QuestionType.Select,
    category: QuestionCategory.Development,
    options: ['2 sata dnevno', '10000 sati dnevno', '-2 s'],
  },
  {
    id: 'final-p1',
    title: 'Komentar:',
    type: QuestionType.TextArea,
    category: QuestionCategory.Final,
  },
  {
    id: 'final-p2',
    title: 'Culture fit',
    type: QuestionType.Slider,
    min: 1,
    max: 10,
    step: 1,
    category: QuestionCategory.Final,
  },
  {
    id: 'final-p3',
    title: 'Ambicije',
    type: QuestionType.Slider,
    min: 1,
    max: 10,
    step: 1,
    category: QuestionCategory.Final,
  },
  {
    id: 'final-p4',
    title: 'Sposobnost',
    type: QuestionType.Slider,
    min: 1,
    max: 5,
    step: 1,
    category: QuestionCategory.Final,
  },
  {
    id: 'final-p5',
    title: 'Upoznatost DUMP-a',
    type: QuestionType.Slider,
    min: 1,
    max: 5,
    step: 1,
    category: QuestionCategory.Final,
  },
];

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
