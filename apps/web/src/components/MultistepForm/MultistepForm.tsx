import { useFetchAllInterviewQuestions } from '@api/index';
import { Question } from '@internship-app/types';
import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import type { FC } from 'react';
import { useState } from 'react';

interface Step<T> {
  label: string;
  category: T;
}

type HandlerProps<FH> = {
  question: Question;
  form: FH;
};

type MultistepFormProps<T, FH> = {
  steps: Step<T>[];
  form: FH;
  onSubmit: () => void;
  InputHandler: FC<HandlerProps<FH>>;
};

const MultistepForm = <T, FH>({
  steps,
  form,
  onSubmit,
  InputHandler,
}: MultistepFormProps<T, FH>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentCategory = steps[currentStep].category;
  const interviewQuestions = useFetchAllInterviewQuestions();

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
        {interviewQuestions.data &&
          interviewQuestions.data
            .filter((q) => q.category === currentCategory && !q.disabled)
            .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
            .map((q) => <InputHandler form={form} question={q} key={q.id} />)}
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
