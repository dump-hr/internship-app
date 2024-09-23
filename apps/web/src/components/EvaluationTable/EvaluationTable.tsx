import { CompleteEvaluationResult } from '@internship-app/types';
import { Box, Modal, Typography } from '@mui/material';
import TestCaseTable from '../TestCaseTable';

export interface EvaluationTableProps {
  result: CompleteEvaluationResult[];
  isOpen: boolean;
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

export const EvaluationTable = ({ result, isOpen }: EvaluationTableProps) => {
  const [score, maxScore] = extractScore(result);
  <Modal open={isOpen}>
    <Box>
      <Typography variant="h6">Evaluation Table</Typography>
      <Typography variant="body1">
        Results: {score} / {maxScore}
      </Typography>
      {result.map((item: CompleteEvaluationResult, index) => (
        <TestCaseTable result={item} index={index} />
      ))}
    </Box>
  </Modal>;
};
