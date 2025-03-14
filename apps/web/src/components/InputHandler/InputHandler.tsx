import { Question, QuestionType } from '@internship-app/types';
import {
  Checkbox,
  FormControlLabel,
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
import { Radio } from '@mui/joy';

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
          step={question.stepValue}
          min={question.minValue}
          max={question.maxValue}
        />
      );
    case QuestionType.Checkbox:
      return (
        <>
          {question.options &&
            question.options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox
                    checked={field.value?.includes(option)}
                    onChange={(e) => {
                      const selectedOptions = e.target.checked
                        ? [...(field.value || []), option]
                        : field.value.filter((val: string) => val !== option);
                      field.onChange(selectedOptions);
                    }}
                    value={option}
                  />
                }
                label={option}
              />
            ))}
        </>
      );
    case QuestionType.Radio:
      return (
        <>
          {question.options.map((option) => (
            <FormControlLabel
              key={option}
              control={
                <Radio
                  {...field}
                  value={option}
                  checked={field.value === option}
                  onChange={(e) => field.onChange(e.target.value)}
                />
              }
              label={option}
            />
          ))}
        </>
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
          InputProps={{
            inputProps: { min: question.minValue, max: question.maxValue },
          }}
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
      {question.question && <InputLabel>{question.question}</InputLabel>}
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
