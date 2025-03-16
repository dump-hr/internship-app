import { Answer } from '@internship-app/types';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';

type AnswerInfoProps = {
  answer: Answer;
};

export const AnswerInfo = ({ answer }: AnswerInfoProps) => {
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
          <Typography variant="body1">{answer.answer}</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="10px">
          <Button variant="contained" color="primary">
            Flag
          </Button>
          <Button variant="contained" color="primary">
            Uđi u pripravnika
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
