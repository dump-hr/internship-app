import { Answer } from '@internship-app/types';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { navigate } from 'wouter/use-location';
import { Path } from '../../constants/paths';
import { useState } from 'react';
import { useUpdateAnswer } from '../../api/useUpdateAnswer';

type AnswerInfoProps = {
  answer: Answer;
};

export const AnswerInfo = ({ answer }: AnswerInfoProps) => {
  const [isFlagged, setIsFlagged] = useState<boolean>(answer.tick);
  const updateAnswer = useUpdateAnswer();

  const handleFlag = () => {
    setIsFlagged(!isFlagged);
    const updatedAnswer = { ...answer, tick: !isFlagged };
    updateAnswer.mutate(updatedAnswer);
  };

  const handleViewInternInfo = () => {
    navigate(Path.Intern.replace(':internId', answer.internId));
  };
  return (
    <Card
      sx={{
        mb: 2,
        p: 2,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <CardContent
        sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
      >
        <Box display="flex" alignItems="center" gap="10px">
          <Typography variant="h6">{answer.internName}:</Typography>
          <Typography variant="body1">
            {Array.isArray(answer.answer)
              ? answer.answer.join(', ')
              : answer.answer}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="10px">
          <Button variant="outlined" color="primary" onClick={handleFlag}>
            {isFlagged ? 'Unflag' : 'Flag'}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleViewInternInfo}
          >
            Uđi u pripravnika
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
