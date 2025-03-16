import { InterviewQuestion } from '@internship-app/types';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';

interface Step<T> {
  label: string;
  category: T;
}

type HandlerProps<FH> = {
  question: InterviewQuestion;
  form: FH;
};

type MultistepFormProps<T, FH> = {
  steps: Step<T>[];
  questions: InterviewQuestion[];
  form: FH;
  onSubmit: () => void;
  InputHandler: React.FC<HandlerProps<FH>>;
};

const MultistepForm = <T, FH>({
  steps,
  questions,
  form,
  onSubmit,
  InputHandler,
}: MultistepFormProps<T, FH>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentCategory = steps[currentStep].category;

  console.log(steps);

  return (
    <Box>
      <Stepper activeStep={currentStep} nonLinear>
        {steps.map((s, i) => (
          <Step key={i} onClick={() => setCurrentStep(i)}>
            <StepLabel>{s.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box display="flex" flexDirection="column" gap="20px">
        {questions
          .filter(
            (q) =>
              q.discipline === currentCategory ||
              q.category === currentCategory,
          )
          .map((q) => (
            <InputHandler form={form} question={q} key={q.id} />
          ))}
      </Box>

      <Box>
        <Button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          disabled={currentStep === 0}
        >
          Nazad
        </Button>
        <Button
          onClick={() => setCurrentStep((prev) => prev + 1)}
          disabled={currentStep === steps.length - 1}
        >
          Naprijed
        </Button>
        <Button onClick={onSubmit} disabled={currentStep !== steps.length - 1}>
          Završi
        </Button>
      </Box>
    </Box>
  );
};

export default MultistepForm;
