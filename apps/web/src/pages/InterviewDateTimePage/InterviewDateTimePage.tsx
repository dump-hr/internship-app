import {
  Box,
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker/';
import { useState } from 'react';
import { useRoute } from 'wouter';

import { useGetIntern } from '../../api/useGetIntern';
import { Path } from '../../constants/paths';

const availableDates = [
  new Date('2023-9-4'),
  new Date('2023-9-5'),
  new Date('2023-9-7'),
  new Date('2023-9-8'),
  new Date('2023-9-10'),
  new Date('2023-9-11'),
];

const availableTimes = [
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
];

interface DateType {
  $D: number;
  $M: number;
  $y: number;
}

const InterviewDateTimePage = () => {
  const [, params] = useRoute(Path.InterviewDateTime);
  const internId = params?.internId;

  const [selectedDate, setSelectedDate] = useState<DateType | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const { data: intern } = useGetIntern(internId);

  const internName = intern?.firstName;

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleClose = () => {
    setDialogOpen(false);
  };

  const handleSelectTime = (value: string) => {
    setSelectedTime(value);
  };

  const handleChange = (date: DateType | null) => {
    setSelectedDate(date);
    console.log(selectedDate);
    setDialogOpen(true);
  };

  const handleDisbleDate = (date: DateType, availableDates: Date[]) => {
    const dateIsAvailable = availableDates.some(
      (availableDate) =>
        availableDate.getDate() === date.$D &&
        availableDate.getMonth() === date.$M &&
        availableDate.getFullYear() === date.$y,
    );

    return !dateIsAvailable;
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '700px',
          margin: '0 auto',
          borderRadius: '20px',
          marginTop: '20px',
          padding: '20px',
        }}
      >
        <Typography
          sx={{
            textAlign: 'center',
            marginBottom: '20px',
          }}
          variant="h5"
        >
          Pozdrav {internName}, odaberi termin za intervju
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              '& .MuiPickersCalendarHeader-root': {
                width: 256,
              },
              '& .MuiIconButton-root': {
                width: 32,
              },
              '& .MuiTypography-caption': {
                width: 32,
              },
              '& .MuiPickersDay-root': {
                width: 32,
                height: 32,
              },
              '& .MuiYearCalendar-root': {
                width: 256,
              },
            }}
          >
            <StaticDatePicker
              shouldDisableDate={(d) =>
                handleDisbleDate(d as DateType, availableDates)
              }
              onAccept={() => {
                console.log('onAccept');
              }}
              onChange={handleChange}
            />
          </Box>
          {selectedDate && screen.width > 450 ? (
            <Box
              sx={{
                marginLeft: '30px',
                border: '2px solid #1565C0',
                borderRadius: '10px',
                padding: '10px',
              }}
            >
              <Typography sx={{ textAlign: 'center' }} variant="subtitle1">
                Dostupni termini:
              </Typography>
              {availableTimes.map((time) => (
                <ListItem
                  sx={{
                    padding: '0px 10px',
                    border:
                      selectedTime === time ? '1px solid #1565C0' : 'undefined',
                    borderRadius: '10px',
                  }}
                  disableGutters
                  key={time}
                >
                  <ListItemButton
                    sx={{
                      padding: '0px',
                    }}
                    onClick={() => handleSelectTime(time)}
                  >
                    <ListItemText
                      sx={{
                        textAlign: 'center',
                      }}
                      primary={time}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </Box>
          ) : (
            <Dialog onClose={handleClose} open={dialogOpen}>
              <Typography variant="subtitle1" sx={{ textAlign: 'center' }}>
                Datum: {selectedDate?.$D}.{selectedDate?.$M}.{selectedDate?.$y}.
              </Typography>
              <DialogTitle>Izaberi termin:</DialogTitle>
              <List sx={{ pt: 0 }}>
                {availableTimes.map((time) => (
                  <ListItem
                    sx={{
                      border:
                        selectedTime === time
                          ? '1px solid #1565C0'
                          : 'undefined',
                    }}
                    disableGutters
                    key={time}
                  >
                    <ListItemButton onClick={() => handleSelectTime(time)}>
                      <ListItemText
                        sx={{
                          textAlign: 'center',
                        }}
                        primary={time}
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Dialog>
          )}
        </Box>
      </Box>
    </>
  );
};

export default InterviewDateTimePage;
