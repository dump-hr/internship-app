import { TestSlot } from '@internship-app/types';
import { Box, Typography } from '@mui/material';

type SlotQuestionListProps = {
  slot: TestSlot;
};

export const SlotQuestionList: React.FC<SlotQuestionListProps> = ({ slot }) => {
  return (
    <Box>
      <Typography variant="h4">Pitanja</Typography>
      <Box display="flex" flexDirection="column" gap="6px">
        {slot.testQuestions
          .sort((a, b) => a.order - b.order)
          .map((q) => (
            <Box
              style={{ background: '#ccc', border: '3px solid black' }}
              key={q.id}
            >
              <Typography fontWeight="600">
                {q.order}. {q.title}
              </Typography>
              <Typography>{q.text}</Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};
