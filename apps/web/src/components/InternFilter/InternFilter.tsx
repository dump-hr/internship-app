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
import { useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';

import InputHandler from '../InputHandler';

type CriteriaSection = {
  id: string;
  questions: Question[];
};

const initialCriteria: CriteriaSection[] = [
  {
    id: 'main',
    questions: [
      {
        id: 'main.name',
        type: QuestionType.Field,
        registerValue: '',
        title: 'Ime/mail/testid',
      },
      {
        id: 'main.status',
        type: QuestionType.Select,
        registerValue: '',
        options: ['', ...Object.keys(InternStatus)],
        title: 'Status',
      },
      {
        id: 'main.interviewStatus',
        type: QuestionType.Select,
        registerValue: '',
        options: ['', ...Object.keys(InterviewStatus)],
        title: 'Intervju',
      },
    ],
  },
];

const getNewCriteria = (id: string): CriteriaSection => ({
  id,
  questions: [
    {
      id: `${id}.discipline`,
      type: QuestionType.Select,
      registerValue: Discipline.Development,
      options: Object.keys(Discipline),
      title: 'Područje',
    },
    {
      id: `${id}.status`,
      type: QuestionType.Select,
      registerValue: '',
      options: ['', ...Object.keys(DisciplineStatus)],
      title: 'Status',
    },
    {
      id: `${id}.testStatus`,
      type: QuestionType.Select,
      registerValue: '',
      options: ['', ...Object.keys(TestStatus)],
      title: 'Test',
    },
    {
      id: `${id}.score`,
      type: QuestionType.Field,
      registerValue: '',
      title: 'Bodovi (eg >15)',
    },
    {
      id: `${id}.not`,
      type: QuestionType.Checkbox,
      registerValue: false,
      title: 'Not',
    },
  ],
});

type InternFilterProps = {
  submitHandler: (values: FieldValues) => void;
  disabled?: boolean;
};

const InternFilter = ({ submitHandler, disabled }: InternFilterProps) => {
  const form = useForm();
  const { unregister, handleSubmit } = form;
  const [criteria, setCriteria] = useState(initialCriteria);

  const addDisciplineSection = () => {
    const id = `disciplines.${crypto.randomUUID()}`;
    setCriteria((prev) => [...prev, getNewCriteria(id)]);
  };

  const removeDisciplineSection = (id: string) => {
    setCriteria((prev) => prev.filter((c) => c.id !== id));
    unregister(id);
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

export default InternFilter;
