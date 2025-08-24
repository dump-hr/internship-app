import { FilterCriteria } from '@components/index';
import {
  Discipline,
  DisciplineStatus,
  Intern,
  InternStatus,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';

export const serializeFilters = (filters: FilterCriteria): string => {
  const params = new URLSearchParams();
  const main = filters?.main ?? {
    name: '',
    status: '',
    interviewStatus: '',
  };

  const disciplines = filters?.disciplines ?? {};

  // Serialize main filters
  if (main.name) params.set('name', main.name);
  if (main.status) params.set('status', main.status);
  if (main.interviewStatus) params.set('interviewStatus', main.interviewStatus);

  // Serialize discipline filters (accept inner ids; always emit 'disciplines.<id>.<field>')
  const disciplineEntries = Object.entries(disciplines);

  disciplineEntries.forEach(([rawKey, d]) => {
    const innerId = rawKey.startsWith('disciplines.')
      ? rawKey.slice('disciplines.'.length)
      : rawKey;

    const key = `disciplines.${innerId}`;

    if (d.discipline) params.set(`${key}.discipline`, d.discipline);
    if (d.status) params.set(`${key}.status`, d.status);
    if (d.testStatus) params.set(`${key}.testStatus`, d.testStatus);
    if (d.score) params.set(`${key}.score`, String(d.score));
    if (d.not) params.set(`${key}.not`, 'true');
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
    // Only accept keys shaped like: disciplines.<uuid>.discipline)
    if (!key.startsWith('disciplines.')) continue;

    const parts = key.split('.');
    if (parts.length !== 3) continue;

    const disciplineId = parts[1];
    if (!disciplineId) continue;

    if (!filters.disciplines[disciplineId]) {
      filters.disciplines[disciplineId] = {
        discipline: Discipline.Development,
        status: '',
        testStatus: '',
        score: '',
        not: false,
      };
    }

    const field = parts[2];
    if (
      field === 'discipline' &&
      Object.values(Discipline).includes(value as Discipline)
    ) {
      filters.disciplines[disciplineId].discipline = value as Discipline;
    }

    if (
      field === 'status' &&
      (value === '' ||
        Object.values(DisciplineStatus).includes(value as DisciplineStatus))
    ) {
      filters.disciplines[disciplineId].status = value as '' | DisciplineStatus;
    }

    if (
      field === 'testStatus' &&
      (value === '' || Object.values(TestStatus).includes(value as TestStatus))
    ) {
      filters.disciplines[disciplineId].testStatus = value as '' | TestStatus;
    }

    if (field === 'score') {
      filters.disciplines[disciplineId].score = value;
    }

    if (field === 'not') {
      filters.disciplines[disciplineId].not = value === 'true';
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
