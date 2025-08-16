import { useUpdateTestSlot } from '@api/index';
import { InputHandler } from '@components/index';
import { Question, QuestionType, TestSlot } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { FC } from 'react';

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
    question: 'Početak',
    type: QuestionType.DateTime,
    registerValue: moment(slot.start).format('YYYY-MM-DDTHH:mm:ss'),
  },
  {
    id: 'end',
    question: 'Kraj',
    type: QuestionType.DateTime,
    registerValue: moment(slot.end).format('YYYY-MM-DDTHH:mm:ss'),
  },
  {
    id: 'location',
    question: 'Lokacija',
    type: QuestionType.Field,
    registerValue: slot.location,
  },
  {
    id: 'capacity',
    question: 'Kapacitet',
    type: QuestionType.Number,
    minValue: slot.internDisciplines.length,
    registerValue: slot.capacity,
  },
  {
    id: 'maxPoints',
    question: 'Max broj bodova',
    type: QuestionType.Number,
    minValue: 0,
    registerValue: slot.maxPoints,
  },
  {
    id: 'password',
    question: 'Zaporka',
    type: QuestionType.Field,
    registerValue: slot.password,
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
          id: `testQuestions.${tq.id}.question`,
          question: 'Naziv',
          type: QuestionType.Field,
          registerValue: tq.title,
        },
        {
          id: `testQuestions.${tq.id}.text`,
          question: 'Sadržaj',
          type: QuestionType.TextArea,
          registerValue: tq.text,
        },
        {
          id: `testQuestions.${tq.id}.order`,
          question: 'Poredak',
          type: QuestionType.Number,
          registerValue: tq.order,
        },
        {
          id: `testQuestions.${tq.id}.points`,
          question: 'Bodovi',
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
        id: `testQuestions.${randomId}.question`,
        question: 'Naziv',
        type: QuestionType.Field,
        registerValue: '',
      },
      {
        id: `testQuestions.${randomId}.text`,
        question: 'Sadržaj',
        type: QuestionType.TextArea,
        registerValue: '',
      },
      {
        id: `testQuestions.${randomId}.order`,
        question: 'Poredak',
        type: QuestionType.Number,
        registerValue: -1,
      },
      {
        id: `testQuestions.${randomId}.points`,
        question: 'Bodovi',
        type: QuestionType.Number,
        registerValue: 10,
      },
    ] as Question[],
  };
};

export const TestSlotEditForm: FC<TestSlotEditFormProps> = ({
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
