import { BoardActionType } from '@internship-app/types';
import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  Question,
  QuestionType,
  TestStatus,
} from '@internship-app/types';

type Option = {
  description: string;
  questions: Question[];
};

export const options: { [key in BoardActionType]: Option } = {
  [BoardActionType.SetInterviewStatus]: {
    description:
      'Izmijeni intervju status selektiranih na određenu vrijednost.',
    questions: [
      {
        id: 'interviewStatus',
        title: 'Status intervjua',
        type: QuestionType.Select,
        options: Object.values(InterviewStatus),
        registerValue: InterviewStatus.PickTerm,
      },
    ],
  },
  [BoardActionType.SetDiscipline]: {
    description:
      'Izmijeni discipline status selektiranih na određenu vrijednost. Prazna polja bit će ignorirana.',
    questions: [
      {
        id: 'discipline',
        title: 'Područje',
        type: QuestionType.Select,
        options: Object.values(Discipline),
        registerValue: Discipline.Development,
      },
      {
        id: 'status',
        title: 'Status područja',
        type: QuestionType.Select,
        options: ['', ...Object.values(DisciplineStatus)],
        registerValue: '',
      },
      {
        id: 'testStatus',
        title: 'Status testa',
        type: QuestionType.Select,
        options: ['', ...Object.values(TestStatus)],
        registerValue: '',
      },
    ],
  },
};

export const actionQuestion: Question = {
  id: 'actionType',
  title: 'Akcija',
  type: QuestionType.Select,
  options: ['', ...Object.values(BoardActionType)],
  registerValue: '',
};
