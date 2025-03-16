import { Question, QuestionType } from '@internship-app/types';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Radio,
  RadioGroup,
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
    case QuestionType.Radio:
      return (
        <FormControl>
          <RadioGroup
            value={field.value || ''}
            onChange={(e) => field.onChange(e.target.value)}
          >
            {question.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                value={option}
                control={<Radio />}
                label={option}
              />
            ))}
          </RadioGroup>
        </FormControl>
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
      if (question.options && question.options.length > 0) {
        return (
          <FormGroup>
            {question.options?.map((option, index) => (
              <FormControlLabel
                key={index}
                control={
                  <Checkbox
                    checked={
                      Array.isArray(field.value)
                        ? field.value.includes(option)
                        : false
                    }
                    onChange={(e) => {
                      const currentValue = Array.isArray(field.value)
                        ? field.value
                        : [];
                      const newValue = e.target.checked
                        ? [...currentValue, option]
                        : currentValue.filter((item) => item !== option);
                      field.onChange(newValue);
                    }}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        );
      } else {
        return (
          <Checkbox
            {...field}
            checked={field.value === true}
            onChange={(e) => field.onChange(e.target.checked)}
          />
        );
      }
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
