import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useRoute } from 'wouter';

import { useGetIntern } from '../../api/useGetIntern';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { Path } from '../../constants/paths';
import { DatePicker, MuiDate } from './DatePicker';
import { Layout } from './Layout';
import { TimeSlotPicker } from './TimeSlotPicker';

const availableSlots = [
  new Date('2023-09-17T09:00:00'),
  new Date('2023-09-17T09:30:00'),
  new Date('2023-09-17T10:00:00'),
  new Date('2023-09-17T10:30:00'),
  new Date('2023-09-17T11:00:00'),
  new Date('2023-09-17T11:30:00'),
  new Date('2023-09-17T12:00:00'),
  new Date('2023-09-17T12:30:00'),
  new Date('2023-09-17T14:00:00'),
  new Date('2023-09-17T14:30:00'),
  new Date('2023-09-17T15:00:00'),
  new Date('2023-09-17T15:30:00'),
];

const ScheduleInterviewPage = () => {
  const [, params] = useRoute(Path.ScheduleInterview);
  const isMobile = useMediaQuery('(max-width:700px)');

  const { data: intern, isLoading, isError } = useGetIntern(params?.internId);

  const [selectedDate, setSelectedDate] = useState<MuiDate | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = () => {
    console.log(selectedSlot);
  };

  const interviewSlotDateFormat =
    selectedSlot?.toLocaleString('hr-HR', {
      timeStyle: 'short',
      dateStyle: 'short',
    }) +
    '-' +
    selectedSlot?.toLocaleTimeString('hr-HR', {
      timeStyle: 'short',
    });

  if (isLoading) return <Layout title="Loading..." />;

  if (isError)
    return (
      <Layout title="Dogodila se greška. Molimo kontaktirajte nas na info@dump.hr" />
    );

  return (
    <Layout title={`Pozdrav ${intern?.firstName}, odaberi termin za intervju`}>
      <Box
        sx={{
          display: 'flex',
          alignItems: isMobile ? 'center' : 'flex-start',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <DatePicker
          availableDates={availableSlots}
          onChange={setSelectedDate}
        />
        {!!selectedDate && (
          <TimeSlotPicker
            availableTimeSlots={availableSlots.filter(
              (slot) =>
                slot.getDate() === selectedDate.$D &&
                slot.getMonth() === selectedDate.$M &&
                slot.getFullYear() === selectedDate.$y,
            )}
            isMobile={isMobile}
            onChange={(slot) => {
              setSelectedSlot(slot);
              setDialogOpen(true);
            }}
          />
        )}
      </Box>
      <ConfirmDialog
        open={!!dialogOpen}
        handleClose={(confirmed) => {
          if (confirmed) handleSubmit();
          setDialogOpen(false);
        }}
        title="Potvrdi odabir termina"
        description={`Vaš termin bit će rezerviran za ${interviewSlotDateFormat}.`}
      />
    </Layout>
  );
};

export default ScheduleInterviewPage;
