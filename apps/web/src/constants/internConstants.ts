import {
  Discipline,
  DisciplineStatus,
  InternLogAction,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';

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

export const testStatusLabel = {
  [TestStatus.PickTerm]: 'Odabir termina',
  [TestStatus.Pending]: 'Čekanje',
  [TestStatus.Missed]: 'Propušteno',
  [TestStatus.Done]: 'Obavljeno',
};

export const interviewStatusLabel = {
  [InterviewStatus.NoRight]: 'Zasad nemaš pravo na intervju',
  [InterviewStatus.PickTerm]: 'Odaberi termin',
  [InterviewStatus.Pending]: 'Na čekanju',
  [InterviewStatus.Missed]: 'Propušteno',
  [InterviewStatus.Done]: 'Obavljeno',
};

export const internActionLabel = {
  [InternLogAction.OpenStatusPage]: 'StatusP',
  [InternLogAction.OpenInterviewPage]: 'IntervjuP',
  [InternLogAction.OpenTestPage]: 'TestP',
};
