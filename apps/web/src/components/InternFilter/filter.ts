import {
  Discipline,
  DisciplineStatus,
  InternStatus,
  InternWithStatus,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';
import toast from 'react-hot-toast';

export type FilterCriteria = {
  main: {
    name: string;
    status: InternStatus | '';
    interviewStatus: InterviewStatus | '';
  };
  disciplines: {
    [key: string]: {
      discipline: Discipline;
      status: DisciplineStatus | '';
      testStatus: TestStatus | '';
      score: string | '';
    };
  };
};

export const getInternFilter =
  (criteria: FilterCriteria) => (intern: InternWithStatus) => {
    const { main } = criteria;

    if (
      main.name &&
      !`${intern.firstName} ${intern.lastName}`
        .toLocaleLowerCase()
        .includes(main.name.toLocaleLowerCase())
    )
      return false;

    if (main.status && intern.status !== main.status) return false;

    if (main.interviewStatus && intern.interviewStatus !== main.interviewStatus)
      return false;

    const disciplineCriteria = Object.values(criteria.disciplines || []);
    for (const dc of disciplineCriteria) {
      const ind = intern.internDisciplines.find(
        (ind) => ind.discipline === dc.discipline,
      );
      if (!ind) return false;

      if (dc.status && ind.status !== dc.status) return false;

      if (dc.testStatus && ind.testStatus !== dc.testStatus) return false;

      if (dc.score) {
        const expression = dc.score;
        try {
          if (!eval(`${ind.testScore} ${expression}`)) return false;
        } catch (err) {
          toast.error(`Pogreška u filtriranju bodova: ${err}`);
        }
      }
    }

    return true;
  };
