import { InputHandler } from '@components/index';
import {
  Discipline,
  DisciplineStatus,
  InternStatus,
  InterviewStatus,
  Question,
  QuestionType,
  TestStatus,
} from '@internship-app/types';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

type CriteriaSection = {
  id: string;
  questions: Question[];
};

type DisciplineCriteria = {
  discipline?: Discipline;
  status?: DisciplineStatus;
  testStatus?: TestStatus;
  score?: number;
  not?: boolean;
};

type MainCriteria = {
  name?: string;
  status?: InternStatus;
  interviewStatus?: InterviewStatus;
};

const getInitialCriteria = (
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

const getNewCriteria = (
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

type InternFilterProps = {
  submitHandler: (values: FieldValues) => void;
  disabled?: boolean;
  initialValues?: FieldValues;
};

export const InternFilter = ({
  submitHandler,
  disabled,
  initialValues,
}: InternFilterProps) => {
  const form = useForm({ shouldUnregister: true });
  const { handleSubmit, reset } = form;
  const [criteria, setCriteria] = useState(getInitialCriteria());

  // Load initial values and criteria from URL params
  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
      const disciplines = initialValues.disciplines ?? {};
      const main = initialValues.main ?? null;

      if (Object.keys(disciplines).length > 0) {
        let disciplineSections = [];

        for (const key in disciplines) {
          const discipline = disciplines[key];
          const sectionId = key.startsWith('disciplines.')
            ? key
            : `disciplines.${key}`;
            
          const disciplineSection = getNewCriteria(sectionId, discipline);
          disciplineSections.push(disciplineSection);
        }
        setCriteria([...getInitialCriteria(main), ...disciplineSections]);
      } else {
        setCriteria(getInitialCriteria(main));
      }
    }
  }, [initialValues, reset]);

  const addDisciplineSection = () => {
    const id = `disciplines.${crypto.randomUUID()}`;
    setCriteria((prev) => [...prev, getNewCriteria(id)]);
  };

  const removeDisciplineSection = (id: string) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <div>
      <Button
        onClick={handleSubmit(submitHandler)}
        variant="contained"
        color="secondary"
        disabled={disabled}
      >
        Filtriraj
      </Button>
      {criteria.map((section, index) => (
        <Box display="flex" gap="20px" alignItems="center" key={section.id}>
          {section.questions.map((q) => (
            <Box
              minWidth={q.type != QuestionType.Checkbox ? '200px' : ''}
              key={q.id}
            >
              <InputHandler form={form} question={q} />
            </Box>
          ))}
          {index !== 0 && (
            <Box>
              <IconButton onClick={() => removeDisciplineSection(section.id)}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
          {criteria.length - 1 === index && (
            <Box>
              <IconButton onClick={addDisciplineSection}>
                <AddIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      ))}
    </div>
  );
};
