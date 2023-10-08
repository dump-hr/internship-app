import { TestSlot, TestStatus } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'wouter';

import { Path } from '../../constants/paths';

type SlotInternListProps = {
  slot: TestSlot;
  simple?: boolean;
};

const borderStylePerStatus = {
  [TestStatus.Pending]: '3px solid purple',
  [TestStatus.Done]: '3px solid green',
  [TestStatus.Missed]: '3px solid red',
  [TestStatus.PickTerm]: '3px dashed red',
};

export const SlotInternList: React.FC<SlotInternListProps> = ({
  slot,
  simple,
}) => {
  return (
    <Box>
      <Typography variant="h4">Interni</Typography>
      <Box gap="6px" display="flex" flexDirection="column">
        {slot.internDisciplines.map((ind) => (
          <Box
            style={{
              border: borderStylePerStatus[ind.testStatus!],
              background: '#ccc',
            }}
            display="flex"
            justifyContent="space-between"
            key={ind.internId}
          >
            <Link
              to={Path.Intern.replace(':internId', ind.internId)}
              style={{
                color: '#000',
                textDecoration: 'none',
              }}
            >
              {ind.intern.firstName} {ind.intern.lastName}
              {!simple && ` - ${ind.intern.email}`}
            </Link>

            {!simple && (
              <Box>
                {ind.testScore !== null ? (
                  <Typography>Score: {ind.testScore}</Typography>
                ) : (
                  <Box>
                    <Button
                      component={Link}
                      to={Path.TestReview.replace(':testSlotId', slot.id)
                        .replace(':group', 'intern')
                        .replace(':groupId', ind.internId)}
                    >
                      Ispravi
                    </Button>
                    <Button component={Link} to={'/'}>
                      Nije došao/la
                    </Button>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
