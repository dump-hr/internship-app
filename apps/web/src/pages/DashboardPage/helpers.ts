import { FilterCriteria } from '@components/index';
import {
  Discipline,
  DisciplineStatus,
  Intern,
  InternStatus,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';

// Helper functions for URL parameter handling
export const serializeFilters = (filters: FilterCriteria): string => {
  const params = new URLSearchParams();

  // Serialize main filters
  if (filters.main.name) params.set('name', filters.main.name);
  if (filters.main.status) params.set('status', filters.main.status);
  if (filters.main.interviewStatus)
    params.set('interviewStatus', filters.main.interviewStatus);

  // Serialize discipline filters
  Object.entries(filters.disciplines).forEach(([key, discipline]) => {
    if (discipline.discipline)
      params.set(`${key}.discipline`, discipline.discipline);
    if (discipline.status) params.set(`${key}.status`, discipline.status);
    if (discipline.testStatus)
      params.set(`${key}.testStatus`, discipline.testStatus);
    if (discipline.score) params.set(`${key}.score`, discipline.score);
    if (discipline.not) params.set(`${key}.not`, 'true');
  });

  return params.toString();
};

export const deserializeFilters = (): FilterCriteria => {
  const params = new URLSearchParams(window.location.search);
  const filters: FilterCriteria = {
    main: { name: '', status: '', interviewStatus: '' },
    disciplines: {},
  };

  // Deserialize main filters
  filters.main.name = params.get('name') || '';
  const status = params.get('status');
  const interviewStatus = params.get('interviewStatus');

  filters.main.status =
    status && Object.values(InternStatus).includes(status as InternStatus)
      ? (status as InternStatus)
      : '';
  filters.main.interviewStatus =
    interviewStatus &&
    Object.values(InterviewStatus).includes(interviewStatus as InterviewStatus)
      ? (interviewStatus as InterviewStatus)
      : '';

  // Deserialize discipline filters
  for (const [key, value] of params.entries()) {
    if (key.includes('.')) {
      const [disciplineKey, field] = key.split('.');
      if (disciplineKey.startsWith('disciplines')) {
        if (!filters.disciplines[disciplineKey]) {
          filters.disciplines[disciplineKey] = {
            discipline: Discipline.Development,
            status: '',
            testStatus: '',
            score: '',
            not: false,
          };
        }

        if (
          field === 'discipline' &&
          Object.values(Discipline).includes(value as Discipline)
        ) {
          filters.disciplines[disciplineKey].discipline = value as Discipline;
        }

        if (
          field === 'status' &&
          (value === '' ||
            Object.values(DisciplineStatus).includes(value as DisciplineStatus))
        ) {
          filters.disciplines[disciplineKey].status = value as
            | ''
            | DisciplineStatus;
        }

        if (
          field === 'testStatus' &&
          (value === '' ||
            Object.values(TestStatus).includes(value as TestStatus))
        ) {
          filters.disciplines[disciplineKey].testStatus = value as
            | ''
            | TestStatus;
        }

        if (field === 'score') {
          filters.disciplines[disciplineKey].score = value;
        }

        if (field === 'not') {
          filters.disciplines[disciplineKey].not = value === 'true';
        }
      }
    }
  }

  return filters;
};

export const getInternStatus = (intern: Intern) => {
  if (
    intern.internDisciplines.some(
      (ind) => ind.status === DisciplineStatus.Pending,
    )
  ) {
    return InternStatus.Pending;
  }

  if (
    intern.internDisciplines.some(
      (ind) => ind.status === DisciplineStatus.Approved,
    )
  ) {
    return InternStatus.Approved;
  }

  return InternStatus.Rejected;
};

export function getFullName(intern: Intern): string {
  return `${intern.firstName.trim()} ${intern.lastName.trim()}`.toLowerCase();
}
