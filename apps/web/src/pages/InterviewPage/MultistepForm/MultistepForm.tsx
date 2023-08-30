import { Box, Button, Step, StepLabel, Stepper } from '@mui/material';
import { useState } from 'react';

interface Step<T> {
  label: string;
  category: T;
}

interface MultistepQuestion<T> {
  category: T;
}

type HandlerProps<Q, FH> = {
  question: Q;
  form: FH;
};

type MultistepFormProps<T, Q extends MultistepQuestion<T>, FH> = {
  steps: Step<T>[];
  questions: Q[];
  form: FH;
  Handler: React.FC<HandlerProps<Q, FH>>;
};

const MultistepForm = <T, Q extends MultistepQuestion<T>, FH>({
  steps,
  questions,
  form,
  Handler,
}: MultistepFormProps<T, Q, FH>) => {
  const [currentStep, setCurrentStep] = useState(0);
  const currentCategory = steps[currentStep].category;

  return (
    <>
      <Stepper>
        {steps.map((s, i) => (
          <Step key={i} onClick={() => setCurrentStep(i)}>
            <StepLabel>{s.label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {questions
        .filter((q) => q.category === currentCategory)
        .map((q) => (
          <Handler form={form} question={q} />
        ))}

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
      </Box>
    </>
  );
};

export default MultistepForm;
