import { MenuItem, Select, TextField } from '@mui/material';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';

type Question = { id: string; title: string } & (
  | { type: 'field' }
  | { type: 'select'; options: string[] }
);

type QuestionHandlerProps = {
  question: Question;
  form: UseFormReturn<FieldValues>;
};

const getInputComponent = (
  question: Question,
  field: ControllerRenderProps<FieldValues>,
) => {
  if (question.type === 'field') {
    return <TextField {...field} />;
  }

  if (question.type === 'select')
    return (
      <Select {...field}>
        {question.options.map((o) => (
          <MenuItem key={question.id + o} value={o}>
            {o}
          </MenuItem>
        ))}
      </Select>
    );

  return <>Question not valid!</>;
};

const QuestionHandler = ({ question, form }: QuestionHandlerProps) => {
  const { control } = form;

  return (
    <Controller
      control={control}
      name={question.id}
      render={({ field }) => getInputComponent(question, field)}
    />
  );
};

export default QuestionHandler;
