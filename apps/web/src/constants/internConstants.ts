import { Discipline, DisciplineStatus } from '@internship-app/types';

export const disciplineLabel = {
  [Discipline.Design]: 'Dizajn',
  [Discipline.Development]: 'Programiranje',
  [Discipline.Marketing]: 'Marketing',
  [Discipline.Multimedia]: 'Multimedija',
};

export const disciplineStatusLabel = {
  [DisciplineStatus.Pending]: 'Na čekanju',
  [DisciplineStatus.Rejected]: 'Odbijen',
  [DisciplineStatus.Approved]: 'Primljen',
};
