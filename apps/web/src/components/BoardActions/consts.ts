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
      'Izmijeni intervju status selektiranih na određenu vrijednost. Napomena: za poništenje termina intervjua koristi CancelInterviewSlot.',
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
    description: `Izmijeni discipline status selektiranih na određenu vrijednost. Prazna polja bit će ignorirana.
      Napomena: ovo ne utječe na logiku aplikacije, pa bi intervjue/testove/prava trebalo brisati/izmijeniti ručno.`,
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
  [BoardActionType.Kick]: {
    description:
      'Izbacuje selektirane pripravnike iz svih područja, odnosno Internshipa. Poništava termin svih nenapisanih testova i pending intervjua. Koristiti u slučaju da netko odustane.',
    questions: [],
  },
  [BoardActionType.CancelInterviewSlot]: {
    description:
      'Poništava interview slot selektiranih pripravnika, samo u slučaju kada je Pending. Interview slot sada je opet slobodan drugima na biranje, a selektirani pripravnici mogu odabrati drugi termin u aplikaciji. Koristiti u slučaju da netko ipak ne može doći na neki termin.',
    questions: [],
  },
  [BoardActionType.CancelTestSlot]: {
    description:
      'Poništava test slot određenog područja selektiranih pripravnika, samo u slučaju kada je Pending. Test slot sada je opet slobodan drugima na biranje, a selektirani pripravnici mogu odabrati drugi termin u aplikaciji. Koristiti u slučaju da netko ipak ne može doći na neki termin.',
    questions: [
      {
        id: 'discipline',
        title: 'Područje',
        type: QuestionType.Select,
        options: [Discipline.Development, Discipline.Design],
        registerValue: Discipline.Development,
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