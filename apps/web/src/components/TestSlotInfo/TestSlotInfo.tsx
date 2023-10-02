import { TestSlot } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import moment from 'moment';

import { SlotInternList } from './SlotInternList';
import { SlotQuestionList } from './SlotQuestionList';

type TestSlotInfoProps = {
  slot: TestSlot;
};

const TestSlotInfo: React.FC<TestSlotInfoProps> = ({ slot }) => {
  return (
    <Box display="flex" flexDirection="column">
      <Box>
        <Typography variant="h4">{slot.discipline} ispit</Typography>
        <Typography>
          {moment(slot.start).format('DD/MM/YYYY HH:mm')} -{' '}
          {moment(slot.end).format('HH:mm')} @ {slot.location}
        </Typography>
        <Typography>
          Kapacitet: {slot.internDisciplines.length}/{slot.capacity}
        </Typography>
        <Typography>Max bodova: {slot.maxPoints}</Typography>
      </Box>
      <SlotQuestionList slot={slot} />
      <SlotInternList slot={slot} />
    </Box>
  );
};

export default TestSlotInfo;
