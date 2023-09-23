import { Box, useMediaQuery } from '@mui/material';
import type { InterviewSlot } from '@prisma/client';
import { useState } from 'react';
import { useLocation, useRoute } from 'wouter';

import { useFetchAvailableInterviewSlots } from '../../api/useFetchAvailableInterviewSlots';
import { useGetIntern } from '../../api/useGetIntern';
import { useScheduleInterview } from '../../api/useScheduleInterview';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import { Path } from '../../constants/paths';
import { DatePicker, MuiDate } from './DatePicker';
import { Layout } from './Layout';
import { TimeSlotPicker } from './TimeSlotPicker';

const ScheduleInterviewPage = () => {
  const [, params] = useRoute(Path.ScheduleInterview);
  const [, navigate] = useLocation();
  const isMobile = useMediaQuery('(max-width:700px)');

  const intern = useGetIntern(params?.internId);
  const slots = useFetchAvailableInterviewSlots(params?.internId);
  const scheduleInterview = useScheduleInterview(() => {
    navigate(Path.Status.replace(':internId', params?.internId || ''));
  });

  const [selectedDate, setSelectedDate] = useState<MuiDate | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<InterviewSlot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (!selectedSlot || !params?.internId) return;

    scheduleInterview.mutate({
      internId: params.internId,
      interviewSlotId: selectedSlot.id,
    });
  };

  const interviewSlotDateFormat =
    selectedSlot?.start.toLocaleString('hr-HR', {
      timeStyle: 'short',
      dateStyle: 'short',
    }) +
    '-' +
    selectedSlot?.end.toLocaleTimeString('hr-HR', {
      timeStyle: 'short',
    });

  if (intern.isLoading || slots.isLoading) return <Layout title="Loading..." />;

  if (intern.isError || slots.isError)
    return (
      <Layout
        title={`Dogodila se greška (${slots.error}). Molimo kontaktirajte nas na info@dump.hr`}
      />
    );

  if (slots.data?.length === 0) {
    return (
      <Layout title="Nema dostupnih termina. Molimo kontaktirajte nas na info@dump.hr" />
    );
  }

  return (
    <Layout
      title={`Pozdrav ${intern.data?.firstName}, odaberi termin za intervju`}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: isMobile ? 'center' : 'flex-start',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <DatePicker
          availableDates={slots.data?.map((s) => s.start) || []}
          onChange={setSelectedDate}
        />
        {!!selectedDate && (
          <TimeSlotPicker
            availableTimeSlots={
              slots.data?.filter(
                (slot) =>
                  slot.start.getDate() === selectedDate.$D &&
                  slot.start.getMonth() === selectedDate.$M &&
                  slot.start.getFullYear() === selectedDate.$y,
              ) || []
            }
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
