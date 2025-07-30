import {
  DisciplineStatus,
  Intern,
  InternDecisionRequest,
  Question,
  QuestionType,
} from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { FieldValues, useForm } from 'react-hook-form';

import { useSetInternDecision } from '@api/index/useSetInternDecision';
import { InputHandler } from '@components/InputHandler/InputHandler';
import { disciplineLabel } from '@constants/internConstants';

type DecisionHandlerProps = {
  intern: Intern;
};

export const DecisionHandler: React.FC<DecisionHandlerProps> = ({ intern }) => {
  const form = useForm();
  const setInternDecision = useSetInternDecision();

  const questions: Question[] = intern.internDisciplines.map((ind) => ({
    id: ind.discipline,
    type: QuestionType.Select,
    title: disciplineLabel[ind.discipline],
    options: Object.values(DisciplineStatus),
    registerValue: ind.status,
  }));

  const submitHandler = (data: FieldValues) => {
    const request: InternDecisionRequest = {
      internId: intern.id,
      disciplines: intern.internDisciplines.map((ind) => ({
        discipline: ind.discipline,
        status: data[ind.discipline],
      })),
    };

    setInternDecision.mutate(request);
  };

  return (
    <>
      <Typography variant="h4">Odluka</Typography>
      <Box display="flex" gap="30px">
        {questions.map((q) => (
          <Box width="200px" key={q.id}>
            <InputHandler question={q} form={form} />
          </Box>
        ))}
        <Button
          variant="contained"
          color="warning"
          onClick={form.handleSubmit(submitHandler)}
          disabled={setInternDecision.isSuccess}
        >
          Odluči
        </Button>
      </Box>
    </>
  );
};
