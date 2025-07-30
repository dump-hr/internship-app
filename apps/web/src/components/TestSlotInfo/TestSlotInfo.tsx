import { TestSlot } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import moment from 'moment';

import { SlotInternList } from './SlotInternList';
import { SlotQuestionList } from './SlotQuestionList';

type TestSlotInfoProps = {
  slot: TestSlot;
  simple?: boolean;
};

export const TestSlotInfo: React.FC<TestSlotInfoProps> = ({ slot, simple }) => {
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
        <Typography>Zaporka: {slot.password}</Typography>
      </Box>
      <SlotQuestionList slot={slot} simple={simple} />
      <SlotInternList slot={slot} simple={simple} />
    </Box>
  );
};
