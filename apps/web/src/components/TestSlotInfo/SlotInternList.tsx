import { BoardActionType, TestSlot, TestStatus } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'wouter';

import { useApplyBoardAction } from '@api/index/Intern/useApplyBoardAction';
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
  const applyBoardAction = useApplyBoardAction();

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

            {!simple && ind.testStatus !== TestStatus.Missed && (
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
                    <Button
                      onClick={() => {
                        applyBoardAction.mutateAsync({
                          action: {
                            actionType: BoardActionType.SetTestStatus,
                            testStatus: TestStatus.Missed,
                            discipline: ind.discipline,
                          },
                          internIds: [ind.internId],
                        });
                      }}
                    >
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
