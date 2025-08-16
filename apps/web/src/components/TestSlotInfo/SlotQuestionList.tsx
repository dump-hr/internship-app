import { TestSlot } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'wouter';

import type { FC } from 'react';
import { Path } from '@constants/index';

type SlotQuestionListProps = {
  slot: TestSlot;
  simple?: boolean;
};

export const SlotQuestionList: FC<SlotQuestionListProps> = ({
  slot,
  simple,
}) => {
  return (
    <Box>
      <Typography variant="h4">Pitanja</Typography>
      <Box display="flex" flexDirection="column" gap="6px">
        {slot.testQuestions
          .sort((a, b) => a.order - b.order)
          .map((q) => (
            <Box
              style={{ background: '#ccc', border: '3px solid black' }}
              display="flex"
              justifyContent="space-between"
              key={q.id}
            >
              <Box>
                <Typography fontWeight="600">
                  {q.order}. {q.title}
                </Typography>
                <Typography>{q.text}</Typography>
              </Box>
              {!simple && (
                <Button
                  component={Link}
                  to={Path.TestReview.replace(':testSlotId', slot.id)
                    .replace(':group', 'question')
                    .replace(':groupId', q.id)}
                >
                  Ispravi
                </Button>
              )}
            </Box>
          ))}
      </Box>
    </Box>
  );
};
