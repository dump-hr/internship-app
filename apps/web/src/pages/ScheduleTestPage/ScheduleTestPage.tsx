import { Discipline, Slot } from '@internship-app/types';
import { Box, useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useRoute } from 'wouter';

import { useFetchAvailableTestSlots } from '../../api/useFetchAvailableTestSlots';
import { useScheduleTest } from '../../api/useScheduleTest';
import { ConfirmDialog } from '../../components/ConfirmDialog';
import SlotPickerLayout from '../../components/SlotPickerLayout';
import {
  DatePicker,
  MuiDate,
  TimeSlotPicker,
} from '../../components/SlotPickers';
import { disciplineLabel } from '../../constants/internConstants';
import { Path } from '../../constants/paths';

type Params = { internId: string; discipline: Discipline };

const ScheduleTestPage = () => {
  const [, params] = useRoute<Params>(Path.ScheduleTest);
  const isMobile = useMediaQuery('(max-width:700px)');

  const {
    data: slots,
    isLoading,
    isError,
    error,
  } = useFetchAvailableTestSlots(params?.internId, params?.discipline);

  const scheduleTest = useScheduleTest();

  const [selectedDate, setSelectedDate] = useState<MuiDate | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = () => {
    if (!selectedSlot || !params?.internId) return;

    scheduleTest.mutate({
      internId: params.internId,
      testSlotId: selectedSlot.id,
    });
  };

  const testSlotDateFormat =
    selectedSlot?.start.toLocaleString('hr-HR', {
      timeStyle: 'short',
      dateStyle: 'short',
    }) +
    '-' +
    selectedSlot?.end.toLocaleTimeString('hr-HR', {
      timeStyle: 'short',
    });

  if (isLoading) return <SlotPickerLayout title="Loading..." />;

  if (isError || !params?.discipline || !params.internId)
    return (
      <SlotPickerLayout
        title={`Dogodila se greška (${error}). Molimo kontaktirajte nas na info@dump.hr`}
      />
    );

  if (slots?.length === 0) {
    return (
      <SlotPickerLayout title="Zasad nema dostupnih termina, ali obavijestit ćemo te mailom kad ih bude." />
    );
  }

  return (
    <SlotPickerLayout
      title={`Odaberi termin za ispit iz područja ${
        disciplineLabel[params.discipline]
      }`}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: isMobile ? 'center' : 'flex-start',
          flexDirection: isMobile ? 'column' : 'row',
        }}
      >
        <DatePicker
          availableDates={slots?.map((s) => s.start) || []}
          onChange={setSelectedDate}
        />
        {!!selectedDate && (
          <TimeSlotPicker
            availableTimeSlots={
              slots?.filter(
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
        description={`Vaš termin bit će rezerviran za ${testSlotDateFormat}.`}
      />
    </SlotPickerLayout>
  );
};

export default ScheduleTestPage;
