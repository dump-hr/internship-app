import {
  CriteriaSection,
  Discipline,
  DisciplineStatus,
  InternForDashboard,
  InternStatus,
  InterviewStatus,
  MainCriteria,
  QuestionType,
  TestStatus,
} from '@internship-app/types';
import toast from 'react-hot-toast';

type DisciplineCriteria = {
  discipline: Discipline | '';
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
  intern: InternForDashboard,
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

export const getInitialCriteria = (
  main: MainCriteria | null = null,
): CriteriaSection[] => [
  {
    id: 'main',
    questions: [
      {
        id: 'main.name',
        type: QuestionType.Field,
        registerValue: main?.name || '',
        question: 'Ime/mail/testid',
      },
      {
        id: 'main.status',
        type: QuestionType.Select,
        registerValue: main?.status || '',
        options: ['', ...Object.keys(InternStatus)],
        question: 'Status',
      },
      {
        id: 'main.interviewStatus',
        type: QuestionType.Select,
        registerValue: main?.interviewStatus || '',
        options: ['', ...Object.keys(InterviewStatus)],
        question: 'Intervju',
      },
    ],
  },
];

export const getNewCriteria = (
  id: string,
  criteria: DisciplineCriteria | null = null,
): CriteriaSection => ({
  id,
  questions: [
    {
      id: `${id}.discipline`,
      type: QuestionType.Select,
      registerValue:
        criteria && Object.prototype.hasOwnProperty.call(criteria, 'discipline')
          ? criteria.discipline
          : Discipline.Development,
      options: Object.keys(Discipline),
      question: 'Područje',
    },
    {
      id: `${id}.status`,
      type: QuestionType.Select,
      registerValue: criteria?.status || '',
      options: ['', ...Object.keys(DisciplineStatus)],
      question: 'Status',
    },
    {
      id: `${id}.testStatus`,
      type: QuestionType.Select,
      registerValue: criteria?.testStatus || '',
      options: ['', ...Object.keys(TestStatus)],
      question: 'Test',
    },
    {
      id: `${id}.score`,
      type: QuestionType.Field,
      registerValue: criteria?.score || '',
      question: 'Bodovi (eg >15)',
    },
    {
      id: `${id}.not`,
      type: QuestionType.Checkbox,
      registerValue: criteria?.not || false,
      question: 'Not',
    },
  ],
});
