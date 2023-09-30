import { Box, Button, Input, InputLabel, Typography } from '@mui/material';
import moment from 'moment';
import { ChangeEvent } from 'react';

import { TestSlotCard } from './SlotCard';

type NewSlotEditProps = {
  slot: TestSlotCard;
  setSlots: React.Dispatch<React.SetStateAction<TestSlotCard[]>>;
};

export const NewSlotEdit: React.FC<NewSlotEditProps> = ({ slot, setSlots }) => {
  const handleFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSlots((prev) =>
      prev.map((e) =>
        e === slot ? { ...slot, [event.target.name]: event.target.value } : e,
      ),
    );
  };

  const handleDelete = () => {
    setSlots((prev) => prev.filter((e) => e !== slot));
  };

  return (
    <Box>
      <Typography>
        Početak: {moment(slot.start).format('MM/DD hh:mm')}
      </Typography>
      <Typography>Kraj: {moment(slot.end).format('MM/DD hh:mm')}</Typography>
      <Typography>
        Trajanje: {moment(slot.end).diff(slot.start, 'minute')}min
      </Typography>
      <InputLabel>Kapacitet</InputLabel>
      <Input
        value={slot.capacity}
        name="capacity"
        type="number"
        onChange={handleFieldChange}
      />
      <Button onClick={handleDelete}>Obriši</Button>
    </Box>
  );
};
