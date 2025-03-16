import {
  InterviewQuestion,
  InterviewQuestionType,
  Question,
} from '@internship-app/types';
import {
  FormControlLabel,
  InputLabel,
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
  question: InterviewQuestion | Question;
  form: UseFormReturn<FieldValues>;
};

const getInputComponent = (
  question: InterviewQuestion | Question,
  field: ControllerRenderProps<FieldValues>,
) => {
  console.log(question);

  switch (question.type) {
    case InterviewQuestionType.Field:
      return <TextField {...field} fullWidth />;
    case InterviewQuestionType.TextArea:
      return (
        <TextareaAutosize style={{ width: '100%' }} minRows={3} {...field} />
      );
    case InterviewQuestionType.Select:
      return (
        <Select {...field} fullWidth>
          {!!question.details &&
            !!question.details.options &&
            question.details.options.map((option) => (
              <MenuItem key={option} value={option}>
                {option || <Typography color="gray">empty</Typography>}
              </MenuItem>
            ))}
        </Select>
      );
    case InterviewQuestionType.Radio:
      return (
        <RadioGroup {...field} row>
          {!!question.details &&
            !!question.details.options &&
            question.details.options.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio />}
                label={option || <Typography color="gray">empty</Typography>}
              />
            ))}
        </RadioGroup>
      );
    case InterviewQuestionType.Slider:
      return (
        <>
          {!!question.details && (
            <Slider
              {...field}
              marks
              valueLabelDisplay="auto"
              step={question.details.step ?? 1}
              min={question.details.min ?? 1}
              max={question.details.max ?? 100}
            />
          )}
        </>
      );
    case InterviewQuestionType.Date:
      return <TextField {...field} type="date" />;
    case InterviewQuestionType.DateTime:
      return <TextField {...field} type="datetime-local" />;
    case InterviewQuestionType.Number:
      return (
        <>
          {!!question.details && (
            <TextField
              {...field}
              type="number"
              InputProps={{
                inputProps: {
                  min: question.details.min,
                  max: question.details.max,
                },
              }}
              onChange={(e) => field.onChange(+e.target.value)}
            />
          )}
        </>
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
        render={({ field }) => getInputComponent(question, field)}
      />
    </>
  );
};

export default InputHandler;
