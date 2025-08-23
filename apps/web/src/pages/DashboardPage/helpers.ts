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
  const main = (filters as any)?.main ?? {
    name: '',
    status: '',
    interviewStatus: '',
  };
  const disciplines = (filters as any)?.disciplines ?? {};

  // Serialize main filters
  if (main.name) params.set('name', main.name);
  if (main.status) params.set('status', main.status);
  if (main.interviewStatus) params.set('interviewStatus', main.interviewStatus);

  // Serialize discipline filters (accept inner ids; always emit 'disciplines.<id>.<field>')
  Object.entries(disciplines as Record<string, unknown>).forEach(
    ([rawKey, discipline]) => {
      const innerId = rawKey.startsWith('disciplines.')
        ? rawKey.slice('disciplines.'.length)
        : rawKey;
      // Guard against malformed keys like 'disciplines' or empty
      if (!innerId || innerId === 'disciplines') return;
      const key = `disciplines.${innerId}`;
      const d = discipline as Partial<{
        discipline: Discipline;
        status: DisciplineStatus | '';
        testStatus: TestStatus | '';
        score: string | '';
        not: boolean;
      }>;
      if (d.discipline) params.set(`${key}.discipline`, d.discipline);
      if (d.status) params.set(`${key}.status`, d.status);
      if (d.testStatus) params.set(`${key}.testStatus`, d.testStatus);
      if (d.score) params.set(`${key}.score`, d.score);
      if (d.not) params.set(`${key}.not`, 'true');
    },
  );

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
      const parts = key.split('.');
      // Expecting keys like: disciplines.<uuid>.discipline | status | testStatus | score | not
      if (parts.length >= 3 && parts[0] === 'disciplines') {
        const disciplineKey = parts[1];
        const field = parts[2];
        if (!disciplineKey || disciplineKey === 'disciplines') continue;

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
