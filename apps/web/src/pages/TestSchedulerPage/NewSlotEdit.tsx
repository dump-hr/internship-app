import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import moment from 'moment';
import type { FC } from 'react';
import { ChangeEvent } from 'react';

import { TestSlotCard } from './types';

type NewSlotEditProps = {
  slot: TestSlotCard;
  setSlots: React.Dispatch<React.SetStateAction<TestSlotCard[]>>;
};

export const NewSlotEdit: FC<NewSlotEditProps> = ({ slot, setSlots }) => {
  const handleFieldChange =
    (getter: 'value' | 'valueAsNumber') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setSlots((prev) =>
        prev.map((e) =>
          e === slot
            ? { ...slot, [event.target.name]: event.target[getter] || '' }
            : e,
        ),
      );
    };

  const handleDelete = () => {
    setSlots((prev) => prev.filter((e) => e !== slot));
  };

  return (
    <Box>
      <Typography>
        Početak: {moment(slot.start).format('MM/DD HH:mm')}
      </Typography>
      <Typography>Kraj: {moment(slot.end).format('MM/DD HH:mm')}</Typography>
      <Typography>
        Trajanje: {moment(slot.end).diff(slot.start, 'minute')}min
      </Typography>

      <InputLabel>Kapacitet</InputLabel>
      <TextField
        value={slot.capacity}
        name="capacity"
        type="number"
        onChange={handleFieldChange('valueAsNumber')}
      />
      <InputLabel>Lokacija</InputLabel>
      <TextField
        value={slot.location}
        name="location"
        onChange={handleFieldChange('value')}
      />
      <InputLabel>Zaporka</InputLabel>
      <TextField
        value={slot.password}
        name="password"
        onChange={handleFieldChange('value')}
      />

      <Button variant="contained" color="error" onClick={handleDelete}>
        Obriši
      </Button>
    </Box>
  );
};
