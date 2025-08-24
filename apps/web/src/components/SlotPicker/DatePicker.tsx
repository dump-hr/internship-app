import { Box, Typography } from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import type { FC } from 'react';
import { useState } from 'react';

export interface MuiDate {
  $D: number;
  $M: number;
  $y: number;
}

type Props = {
  availableDates: Date[];
  onChange: (date: MuiDate) => void;
};

export const DatePicker: FC<Props> = ({ availableDates, onChange }) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );

  const handleChange = (date: MuiDate | null) => {
    if (!date) return;
    onChange(date);
  };

  const handleDisbleDate = (date: MuiDate) => {
    const dateIsAvailable = availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.$D &&
        availableDate.getMonth() === date.$M &&
        availableDate.getFullYear() === date.$y,
    );
    return !dateIsAvailable;
  };

  const handleDisableYear = (date: MuiDate) => {
    return date.$y !== new Date().getFullYear();
  };

  const prevMonthCount = availableDates.filter(
    (d) => d.getMonth() === currentMonth - 1,
  ).length;

  const nextMonthCount = availableDates.filter(
    (d) => d.getMonth() === currentMonth + 1,
  ).length;

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 350,
        position: 'relative',
        overflowX: 'auto',
        '& .MuiDialogActions-root': {
          display: 'none',
        },
        '& .MuiPickersDay-root:not(:disabled):not(.Mui-selected)': {
          backgroundColor: '#e5e5e5',
        },
      }}
    >
      <StaticDatePicker
        onChange={handleChange}
        shouldDisableDate={(d) => handleDisbleDate(d as MuiDate)}
        shouldDisableYear={(d) => handleDisableYear(d as MuiDate)}
        onMonthChange={({ $M }) => setCurrentMonth($M)}
        disablePast
      />
      {!!prevMonthCount && (
        <Typography
          sx={{
            position: 'absolute',
            top: '105px',
            right: '70px',
            color: 'green',
          }}
          variant="overline"
        >
          +{prevMonthCount}
        </Typography>
      )}
      {!!nextMonthCount && (
        <Typography
          sx={{
            position: 'absolute',
            top: '105px',
            right: '30px',
            color: 'green',
          }}
          variant="overline"
        >
          +{nextMonthCount}
        </Typography>
      )}
    </Box>
  );
};
