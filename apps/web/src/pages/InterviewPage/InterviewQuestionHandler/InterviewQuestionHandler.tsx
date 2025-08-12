import { InputHandler } from '@components/index';
import { Question, QuestionType } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import { FieldValues, UseFormReturn } from 'react-hook-form';

type InterviewQuestionHandlerProps = {
  question: Question;
  form: UseFormReturn<FieldValues>;
};

export const InterviewQuestionHandler = ({
  question,
  form,
}: InterviewQuestionHandlerProps) => {
  const questionForValue = {
    ...question,
    id: `${question.id}.value`,
    question: undefined,
  };
  const questionForTick: Question = {
    id: `${question.id}.tick`,
    type: QuestionType.Checkbox,
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography whiteSpace="pre-line">{question.question}</Typography>
      <Box display="flex">
        <InputHandler question={questionForValue} form={form} />
        <InputHandler question={questionForTick} form={form} />
      </Box>
    </Box>
  );
};
