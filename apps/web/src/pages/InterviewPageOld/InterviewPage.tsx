import {
  Button,
  Input,
  MenuItem,
  Select,
  Step,
  StepLabel,
  Stepper,
} from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

const questions: Question[] = [
  {
    type: 'field',
    id: 'prvi',
  },
  {
    type: 'field',
    id: 'drugi',
  },
  {
    type: 'field',
    id: 'treci',
  },
  {
    type: 'select',
    id: 'selekcijski',
    options: ['a', 'b', 'v'],
  },
];

//<Controller
//  control={control}
//  name="selektor"
//  render={({ field }) => (
//    <Select {...field}>
//      <MenuItem value={10}>Ten</MenuItem>
//      <MenuItem value={20}>Twenty</MenuItem>
//      <MenuItem value={30}>Thirty</MenuItem>
//    </Select>
//  )}
///>

const generateDefaultValues = (
  questions: Question[],
): { [key: string]: string } => {
  return questions.reduce(
    (obj, q) => ({
      ...obj,
      [q.id]: q.type === 'field' ? { value: '' } : { value: 'a' },
    }),
    {},
  );
};

enum QuestionType {
  General = 'General',
  Dev = 'Dev',
  Diz = 'Diz',
  Final = 'Final',
}

const InterviewPage = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: generateDefaultValues(questions),
  });

  const [currentStep, setCurrentStep] = useState(QuestionType.General);

  const [formVisible, setFormVisible] = useState(false);

  return (
    <>
      <Stepper activeStep={currentStep} nonLinear>
        <Step key={0}>
          <StepLabel>Prvi</StepLabel>
        </Step>
        <Step key={1}>
          <StepLabel>Drugi</StepLabel>
        </Step>
        <Step key={2} onClick={() => setCurrentStep(2)}>
          <StepLabel>Treći</StepLabel>
        </Step>
      </Stepper>
      <form onSubmit={handleSubmit((e) => console.log(e))}>
        <Button onClick={() => setFormVisible((prev) => !prev)}>
          Toggleaj
        </Button>
        {!formVisible ? (
          <></>
        ) : (
          questions.map((q) =>
            q.type === 'field' ? (
              <div key={q.id}>
                <Input {...register(q.id + '.value')} />
                <br />
              </div>
            ) : (
              <div key={q.id}>
                <Controller
                  control={control}
                  name={q.id + '.value'}
                  render={({ field }) => (
                    <Select {...field}>
                      {q.options.map((o) => (
                        <MenuItem key={q.id + o} value={o}>
                          {o}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                <br />
              </div>
            ),
          )
        )}
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
};

export default InterviewPage;
