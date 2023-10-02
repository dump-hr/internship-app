import { Question, QuestionType, TestSlot } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateTestSlot } from '../../api/useUpdateTestSlot';
import InputHandler from '../../components/InputHandler';

type TestSlotEditFormProps = {
  slot: TestSlot;
  closeEdit: () => void;
};

type TestQuestionBlock = {
  registerId: string;
  id?: string;
  formQuestions: Question[];
};

const getMainQuestions = (slot: TestSlot): Question[] => [
  {
    id: 'start',
    title: 'Početak',
    type: QuestionType.DateTime,
    registerValue: moment(slot.start).format('YYYY-MM-DDTHH:mm:ss'),
  },
  {
    id: 'end',
    title: 'Kraj',
    type: QuestionType.DateTime,
    registerValue: moment(slot.end).format('YYYY-MM-DDTHH:mm:ss'),
  },
  {
    id: 'location',
    title: 'Lokacija',
    type: QuestionType.Field,
    registerValue: slot.location,
  },
  {
    id: 'capacity',
    title: 'Kapacitet',
    type: QuestionType.Number,
    min: slot.internDisciplines.length,
    registerValue: slot.capacity,
  },
  {
    id: 'maxPoints',
    title: 'Max broj bodova',
    type: QuestionType.Number,
    min: 0,
    registerValue: slot.maxPoints,
  },
];

const getInitialTestQuestions = (slot: TestSlot) =>
  slot.testQuestions
    .sort((a, b) => a.order - b.order)
    .map((tq) => ({
      registerId: `testQuestions.${tq.id}`,
      id: tq.id,
      formQuestions: [
        {
          id: `testQuestions.${tq.id}.title`,
          title: 'Naziv',
          type: QuestionType.Field,
          registerValue: tq.title,
        },
        {
          id: `testQuestions.${tq.id}.text`,
          title: 'Sadržaj',
          type: QuestionType.TextArea,
          registerValue: tq.text,
        },
        {
          id: `testQuestions.${tq.id}.order`,
          title: 'Poredak',
          type: QuestionType.Number,
          registerValue: tq.order,
        },
        {
          id: `testQuestions.${tq.id}.points`,
          title: 'Bodovi',
          type: QuestionType.Number,
          registerValue: tq.points,
        },
      ] as Question[],
    }));

const getNewTestQuestion = () => {
  const randomId = crypto.randomUUID();

  return {
    registerId: `testQuestions.${randomId}`,
    formQuestions: [
      {
        id: `testQuestions.${randomId}.title`,
        title: 'Naziv',
        type: QuestionType.Field,
        registerValue: '',
      },
      {
        id: `testQuestions.${randomId}.text`,
        title: 'Sadržaj',
        type: QuestionType.TextArea,
        registerValue: '',
      },
      {
        id: `testQuestions.${randomId}.order`,
        title: 'Poredak',
        type: QuestionType.Number,
        registerValue: -1,
      },
      {
        id: `testQuestions.${randomId}.points`,
        title: 'Bodovi',
        type: QuestionType.Number,
        registerValue: 10,
      },
    ] as Question[],
  };
};

export const TestSlotEditForm: React.FC<TestSlotEditFormProps> = ({
  slot,
  closeEdit: close,
}) => {
  const updateTestSlot = useUpdateTestSlot();

  const form = useForm();
  const mainQuestions = getMainQuestions(slot);

  const initialTestQuestions = getInitialTestQuestions(slot);
  const [testQuestions, setTestQuestions] =
    useState<TestQuestionBlock[]>(initialTestQuestions);

  useEffect(() => {
    testQuestions.map(
      (tq) => tq.id && form.setValue(`${tq.registerId}.id`, tq.id),
    );
  });

  const handleDeleteQuestion = (registerId: string) => {
    form.unregister(registerId);
    setTestQuestions((prev) => prev.filter((q) => q.registerId !== registerId));
  };

  const handleAddQuestion = () => {
    const newQuestion = getNewTestQuestion();
    setTestQuestions((prev) => [newQuestion, ...prev]);
  };

  const handleSubmit = form.handleSubmit((data) => {
    const slotToSend = {
      ...data,
      id: slot.id,
      start: new Date(data.start),
      end: new Date(data.end),
    } as TestSlot;
    slotToSend.testQuestions = Object.values(data.testQuestions || {});

    const request = { testSlotId: slot.id, data: slotToSend };
    updateTestSlot.mutate(request, {
      onSuccess: close,
    });
  });

  return (
    <Box>
      <Typography variant="h2">Uredi event</Typography>
      <Button variant="contained" onClick={handleSubmit}>
        Podnesi
      </Button>

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
