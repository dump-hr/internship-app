import { Discipline } from '@internship-app/types';

export enum QuestionCategory {
  General = 'General',
  Personal = 'Personal',
  Development = 'Development',
  Design = 'Design',
  Marketing = 'Marketing',
  Multimedia = 'Multimedia',
  Final = 'Final',
}

export const steps = [
  { label: 'Općenito', category: QuestionCategory.General },
  { label: 'Osobno', category: QuestionCategory.Personal },
  { label: 'Dev', category: QuestionCategory.Development },
  { label: 'Design', category: QuestionCategory.Design },
  { label: 'Marketing', category: QuestionCategory.Marketing },
  { label: 'Multimedia', category: QuestionCategory.Multimedia },
  { label: 'Ocjena', category: QuestionCategory.Final },
];

export const filterInterviewSteps = (internDisciplines: Discipline[]) =>
  steps.filter(
    ({ category }) =>
      !Object.values(Discipline).some((d) => d === category.toString()) ||
      internDisciplines.some((d) => d == category.toString()),
  );
