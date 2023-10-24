import {
  Discipline,
  DisciplineStatus,
  InternForDashboard,
  InternStatus,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';
import toast from 'react-hot-toast';

type DisciplineCriteria = {
  discipline: Discipline;
  status: DisciplineStatus | '';
  testStatus: TestStatus | '';
  score: string | '';
  not: boolean;
};

export type FilterCriteria = {
  main: {
    name: string;
    status: InternStatus | '';
    interviewStatus: InterviewStatus | '';
  };
  disciplines: {
    [key: string]: DisciplineCriteria;
  };
};

const checkDisciplineCriteria = (
  intern: InternWithStatus,
  criteria: DisciplineCriteria,
) => {
  const ind = intern.internDisciplines.find(
    (ind) => ind.discipline === criteria.discipline,
  );
  if (!ind) return criteria.not;

  if (criteria.status && ind.status !== criteria.status) return criteria.not;

  if (criteria.testStatus && ind.testStatus !== criteria.testStatus)
    return criteria.not;

  if (criteria.score) {
    const expression = criteria.score;
    try {
      if (!eval(`${ind.testScore} ${expression}`)) return criteria.not;
    } catch (err) {
      toast.error(`Pogreška u filtriranju bodova: ${err}`);
    }
  }

  return !criteria.not;
};

export const getInternFilter =
  (criteria: FilterCriteria) => (intern: InternForDashboard) => {
    const { main } = criteria;

    if (
      main.name &&
      !`${intern.firstName} ${intern.lastName} ${
        intern.email
      } ${intern.internDisciplines.map((ind) => ind.testSlotId ?? '')}`
        .toLocaleLowerCase()
        .includes(main.name.toLocaleLowerCase())
    )
      return false;

    if (main.status && intern.status !== main.status) return false;

    if (main.interviewStatus && intern.interviewStatus !== main.interviewStatus)
      return false;

    const disciplineCriteria = Object.values(criteria.disciplines || []);
    for (const dc of disciplineCriteria) {
      if (!checkDisciplineCriteria(intern, dc)) return false;
    }

    return true;
  };
