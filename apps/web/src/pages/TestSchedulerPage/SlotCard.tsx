import { TestSlotPreviewDto } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import React from 'react';

export enum SlotCardType {
  Existing = 'Existing',
  AboutToAdd = 'AboutToAdd',
}

export type TestSlotCard = TestSlotPreviewDto & {
  type: SlotCardType;
};

type SlotCardProps = {
  slot: TestSlotCard;
};

export const SlotCard: React.FC<SlotCardProps> = ({ slot }) => {
  if (slot.type === SlotCardType.Existing)
    return (
      <Box>
        <Typography fontSize="10px">{slot.discipline}</Typography>
        <Typography fontSize="10px">
          Zauzeto: {slot.internCount}/{slot.capacity}
        </Typography>
        <Typography fontSize="10px">Pitanja: {slot.questionCount}</Typography>
        <Typography fontSize="10px">@ {slot.location}</Typography>
      </Box>
    );

  if (slot.type === SlotCardType.AboutToAdd)
    return (
      <Box>
        <Typography>Novi slot</Typography>
        <Typography fontSize="10px">{slot.discipline}</Typography>
        <Typography fontSize="10px">Kapacitet: {slot.capacity}</Typography>
        <Typography fontSize="10px">@ {slot.location}</Typography>
      </Box>
    );

  return <></>;
};
