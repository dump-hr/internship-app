import { CompleteEvaluationResult } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import TestCaseTable from '../TestCaseTable';

export interface EvaluationTableProps {
  result: CompleteEvaluationResult[];
}

const extractScore = (result: CompleteEvaluationResult[]) => {
  let counter = 0;
  let maxCounter = 0;
  result.forEach((item) => {
    counter += item.score;
    maxCounter += item.maxPoints || 0;
  });

  return [counter, maxCounter];
};

export const EvaluationTable = ({ result }: EvaluationTableProps) => {
  const [score, maxScore] = extractScore(result);
  return (
    <Box>
      <Typography variant="h6">Evaluation Table</Typography>
      <Typography variant="body1">
        Results: {score} / {maxScore}
      </Typography>
      {result.map((item: CompleteEvaluationResult, index) => (
        <TestCaseTable result={item} index={index} />
      ))}
    </Box>
  );
};
