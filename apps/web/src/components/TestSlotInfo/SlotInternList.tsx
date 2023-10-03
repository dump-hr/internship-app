import { TestSlot, TestStatus } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import { navigate } from 'wouter/use-location';

import { Path } from '../../constants/paths';

type SlotInternListProps = {
  slot: TestSlot;
};

const borderStylePerStatus = {
  [TestStatus.Pending]: '3px solid purple',
  [TestStatus.Done]: '3px solid green',
  [TestStatus.Missed]: '3px solid red',
  [TestStatus.PickTerm]: '3px dashed red',
};

export const SlotInternList: React.FC<SlotInternListProps> = ({ slot }) => {
  return (
    <Box>
      <Typography variant="h4">Interni</Typography>
      <Box gap="6px" display="flex" flexDirection="column">
        {slot.internDisciplines.map((ind) => (
          <Box
            onClick={() =>
              navigate(Path.Intern.replace(':internId', ind.internId))
            }
            style={{
              border: borderStylePerStatus[ind.testStatus!],
              background: '#ccc',
            }}
            key={ind.internId}
          >
            <Typography>
              {ind.intern.firstName} {ind.intern.lastName}
            </Typography>
            {ind.testScore && <Typography>Score: {ind.testScore}</Typography>}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
