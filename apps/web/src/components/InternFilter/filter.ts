import {
  Discipline,
  DisciplineStatus,
  InternStatus,
  InternWithStatus,
  InterviewStatus,
  TestStatus,
} from '@internship-app/types';

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

export const getInternFilter = (criteria: FilterCriteria) => {
  return (intern: InternWithStatus) => {
    const { main } = criteria;

    console.log(intern);
    if (
      main.name &&
      !`${intern.firstName} ${intern.lastName}`.includes(main.name)
    )
      return false;

    if (main.status && intern.status !== main.status) return false;

    if (main.interviewStatus && intern.interviewStatus !== main.interviewStatus)
      return false;

    const disciplineCriteria = Object.values(criteria.disciplines);
    disciplineCriteria.forEach((dc) => {
      const ind = intern.internDisciplines.find(
        (ind) => ind.discipline === dc.discipline,
      );
      if (!ind) return false;

      if (dc.status && ind.status !== dc.status) return false;

      if (dc.testStatus && ind.testStatus !== dc.testStatus) return false;

      if (dc.score) {
        const expression = dc.score;
        if (!eval(`${ind.testScore} ${expression}`)) return false;
      }
    });

    return true;
  };
};
