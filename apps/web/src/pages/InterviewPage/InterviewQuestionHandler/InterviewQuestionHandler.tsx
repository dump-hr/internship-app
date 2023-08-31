import { Question, QuestionType } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import { FieldValues, UseFormReturn } from 'react-hook-form';

import QuestionHandler from '../../../components/QuestionHandler';

type InterviewQuestionHandlerProps = {
  question: Question;
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
  const questionForTick: Question = {
    id: `${question.id}.tick`,
    type: QuestionType.Checkbox,
  };

  return (
    <Box display="flex" flexDirection="column">
      <Typography>{question.title}</Typography>
      <Box display="flex">
        <QuestionHandler question={questionForValue} form={form} />
        <QuestionHandler question={questionForTick} form={form} />
      </Box>
    </Box>
  );
};

export default InterviewQuestionHandler;
