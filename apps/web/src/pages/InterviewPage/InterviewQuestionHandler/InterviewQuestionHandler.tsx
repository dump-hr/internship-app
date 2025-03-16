import {
  InterviewQuestion,
  InterviewQuestionType,
} from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import InputHandler from '../../../components/InputHandler';

type InterviewQuestionHandlerProps = {
  question: InterviewQuestion;
  form: UseFormReturn<FieldValues>;
};

const InterviewQuestionHandler = ({
  question,
  form,
}: InterviewQuestionHandlerProps) => {
  const questionForValue = {
    ...question,
    id: `${question.id}.value`,
    title: undefined,
  };
  const questionForTick = {
    id: `${question.id}.tick`,
    type: InterviewQuestionType.Checkbox,
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

export default InterviewQuestionHandler;
