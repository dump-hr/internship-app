import {
  Discipline,
  DisciplineStatus,
  InternStatus,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';
import { ChipProps } from '@mui/material';

export const shortDisciplineLabels = {
  [Discipline.Development]: 'Dev',
  [Discipline.Design]: 'Diz',
  [Discipline.Marketing]: 'Mark',
  [Discipline.Multimedia]: 'Mult',
};

export const disciplineStatusChipProps: Record<InternStatus, ChipProps> = {
  [DisciplineStatus.Pending]: {
    color: 'info',
    title: 'Status područja još nije određen',
  },
  [DisciplineStatus.Rejected]: {
    color: 'error',
    title: 'Intern nije prihvaćen u područje',
  },
  [DisciplineStatus.Approved]: {
    color: 'success',
    title: 'Intern je prihvaćen u područje',
  },
};

export const internStatusChipProps: Record<InternStatus, ChipProps> = {
  [InternStatus.Pending]: {
    label: 'Čekanje',
    color: 'info',
    title: 'Status interna još nije određen',
  },
  [InternStatus.Rejected]: {
    label: 'Odbijen',
    color: 'error',
    title: 'Intern nije prihvaćen ni u jedno područje',
  },
  [InternStatus.Approved]: {
    label: 'Prihvaćen',
    color: 'success',
    title: 'Intern je prihvaćen bar u jedno područje',
  },
};

export const interviewChipProps: Record<InterviewStatus, ChipProps> = {
  [InterviewStatus.NoRight]: {
    label: 'Obespravljen',
    color: 'warning',
    title: 'Nema pravo na intervju',
  },
  [InterviewStatus.PickTerm]: {
    label: 'BiraTerm',
    color: 'secondary',
    title: 'U procesu odabira termina',
  },
  [InterviewStatus.Pending]: {
    label: 'Čekanje',
    color: 'info',
    title: 'Termin odabran i čeka',
  },
  [InterviewStatus.Done]: {
    label: 'Obavljen',
    color: 'success',
    title: 'Intervju obavljen',
  },
  [InterviewStatus.Missed]: {
    label: 'Propušten',
    color: 'error',
    title: 'Intervju propušten',
  },
};

export const testChipProps: Record<TestStatus, ChipProps> = {
  [TestStatus.PickTerm]: {
    color: 'secondary',
    title: 'U procesu odabira termina',
  },
  [TestStatus.Pending]: {
    color: 'info',
    title: 'Termin odabran i čeka',
  },
  [InterviewStatus.Done]: {
    color: 'success',
    title: 'Test odrađen (ne nužno i položen)',
  },
  [InterviewStatus.Missed]: {
    color: 'error',
    title: 'Test propušten',
  },
};
