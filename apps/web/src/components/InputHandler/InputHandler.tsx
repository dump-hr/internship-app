import { Question, QuestionType } from '@internship-app/types';
import {
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
  UseFormReturn,
} from 'react-hook-form';

type InputHandlerProps = {
  question: Question;
  form: UseFormReturn<FieldValues>;
};

const getInputComponent = (
  question: Question,
  field: ControllerRenderProps<FieldValues>,
) => {
  switch (question.type) {
    case QuestionType.Field:
      return <TextField {...field} fullWidth />;
    case QuestionType.TextArea:
      return (
        <TextareaAutosize style={{ width: '100%' }} minRows={3} {...field} />
      );
    case QuestionType.Select:
      return (
        <Select {...field} fullWidth>
          {question.options.map((option) => (
            <MenuItem key={option} value={option}>
              {option || <Typography color="gray">empty</Typography>}
            </MenuItem>
          ))}
        </Select>
      );
    case QuestionType.Slider:
      return (
        <Slider
          {...field}
          marks
          valueLabelDisplay="auto"
          step={question.step}
          min={question.min}
          max={question.max}
        />
      );
    case QuestionType.Checkbox:
      return (
        <Checkbox
          {...field}
          checked={field.value}
          onChange={(e) => field.onChange(e.target.checked)}
        />
      );
    case QuestionType.Date:
      return <TextField {...field} type="date" />;
    case QuestionType.DateTime:
      return <TextField {...field} type="datetime-local" />;
    case QuestionType.Number:
      return (
        <TextField
          {...field}
          type="number"
          onChange={(e) => field.onChange(+e.target.value)}
        />
      );
    default:
      return <></>;
  }
};

const InputHandler = ({ question, form }: InputHandlerProps) => {
  const { control } = form;

  return (
    <>
      {question.title && <InputLabel>{question.title}</InputLabel>}
      <Controller
        control={control}
        name={question.id}
        defaultValue={question.registerValue}
        render={({ field }) => getInputComponent(question, field)}
      />
    </>
  );
};

export default InputHandler;
