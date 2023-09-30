import { Question, QuestionType, TestSlot } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import InputHandler from '../../components/InputHandler';

type TestSlotEditFormProps = {
  slot: TestSlot;
};

const getMainQuestions = (slot: TestSlot): Question[] => [
  {
    id: 'start',
    title: 'Početak',
    type: QuestionType.DateTime,
    registerValue: moment(slot.start).format('YYYY-MM-DD hh:mm'),
  },
  {
    id: 'end',
    title: 'Kraj',
    type: QuestionType.DateTime,
    registerValue: moment(slot.end).format('YYYY-MM-DD hh:mm'),
  },
  {
    id: 'capacity',
    title: 'Kapacitet',
    type: QuestionType.Number,
    registerValue: slot.capacity,
  },
];

const getInitialTestQuestions = (slot: TestSlot) =>
  slot.testQuestions
    .sort((a, b) => a.order - b.order)
    .map((tq) => ({
      registerId: `initial.${tq.id}`,
      formQuestions: [
        {
          id: `initial.${tq.id}.title`,
          title: 'Naziv',
          type: QuestionType.Field,
          registerValue: tq.title,
        },
        {
          id: `initial.${tq.id}.text`,
          title: 'Sadržaj',
          type: QuestionType.TextArea,
          registerValue: tq.text,
        },
        {
          id: `initial.${tq.id}.order`,
          title: 'Poredak',
          type: QuestionType.Number,
          registerValue: tq.order,
        },
        {
          id: `initial.${tq.id}.points`,
          title: 'Bodovi',
          type: QuestionType.Number,
          registerValue: tq.points,
        },
      ] as Question[],
    }));

const getNewTestQuestion = () => {
  const randomId = crypto.randomUUID();

  return {
    registerId: `new.${randomId}`,
    formQuestions: [
      {
        id: `new.${randomId}.title`,
        title: 'Naziv',
        type: QuestionType.Field,
        registerValue: '',
      },
      {
        id: `new.${randomId}.text`,
        title: 'Sadržaj',
        type: QuestionType.TextArea,
        registerValue: '',
      },
      {
        id: `new.${randomId}.order`,
        title: 'Poredak',
        type: QuestionType.Number,
        registerValue: 0,
      },
      {
        id: `new.${randomId}.points`,
        title: 'Bodovi',
        type: QuestionType.Number,
        registerValue: 0,
      },
    ] as Question[],
  };
};

export const TestSlotEditForm: React.FC<TestSlotEditFormProps> = ({ slot }) => {
  const form = useForm();
  const mainQuestions = getMainQuestions(slot);

  const initialTestQuestions = getInitialTestQuestions(slot);
  const [testQuestions, setTestQuestions] = useState(initialTestQuestions);

  const handleDeleteQuestion = (registerId: string) => {
    form.unregister(registerId);
    setTestQuestions((prev) => prev.filter((q) => q.registerId !== registerId));
  };

  const handleAddQuestion = () => {
    const newQuestion = getNewTestQuestion();
    setTestQuestions((prev) => [newQuestion, ...prev]);
  };

  return (
    <Box>
      <Button onClick={form.handleSubmit((s) => console.log(s))}>xax</Button>
      <Typography variant="h4">Osnovne informacije</Typography>
      {mainQuestions.map((q) => (
        <InputHandler form={form} question={q} key={q.id} />
      ))}
      <Typography variant="h4">Pitanja</Typography>
      <Box display="flex" flexDirection="column" gap="20px">
        <Button variant="contained" onClick={handleAddQuestion}>
          Dodaj
        </Button>
        {testQuestions.map((q) => (
          <Box
            style={{ background: '#ccc', border: '3px solid black' }}
            key={q.registerId}
          >
            <Button
              variant="contained"
              color="warning"
              onClick={() => handleDeleteQuestion(q.registerId)}
            >
              Obriši
            </Button>
            {q.formQuestions.map((fq) => (
              <InputHandler form={form} question={fq} key={fq.id} />
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
