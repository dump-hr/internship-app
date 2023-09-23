import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';
import { ChipProps } from '@mui/material';

export enum InternStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

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
    label: 'Pending',
    color: 'info',
    title: 'Status interna još nije određen',
  },
  [InternStatus.Rejected]: {
    label: 'Rejected',
    color: 'error',
    title: 'Intern nije prihvaćen ni u jedno područje',
  },
  [InternStatus.Approved]: {
    label: 'Approved',
    color: 'success',
    title: 'Intern je prihvaćen bar u jedno područje',
  },
};

export const interviewChipProps: Record<InterviewStatus, ChipProps> = {
  [InterviewStatus.NoRight]: {
    label: 'NoRight',
    color: 'warning',
    title: 'Nema pravo na intervju',
  },
  [InterviewStatus.PickTerm]: {
    label: 'PickTerm',
    color: 'primary',
    title: 'U procesu odabira termina',
  },
  [InterviewStatus.Pending]: {
    label: 'Pending',
    color: 'info',
    title: 'Termin odabran i čeka',
  },
  [InterviewStatus.Done]: {
    label: 'Done',
    color: 'success',
    title: 'Intervju odrađen',
  },
  [InterviewStatus.Missed]: {
    label: 'Missed',
    color: 'error',
    title: 'Intervju propušten',
  },
};

export const testChipProps: Record<TestStatus, ChipProps> = {
  [TestStatus.PickTerm]: {
    color: 'primary',
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
