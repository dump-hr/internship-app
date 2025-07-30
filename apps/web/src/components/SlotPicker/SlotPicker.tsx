import {
  ConfirmDialog,
  MuiDate,
  Layout,
  TimeSlotPicker,
  DatePicker,
} from '@components/index';
import { Slot } from '@internship-app/types';
import { Box, useMediaQuery } from '@mui/material';
import moment from 'moment';
import { useState } from 'react';

type SlotPickerProps = {
  title: string;
  slots: Slot[];
  handleSubmit: (slot: Slot) => void;
};

export const SlotPicker: React.FC<SlotPickerProps> = ({
  title,
  slots,
  handleSubmit,
}) => {
  const [selectedDate, setSelectedDate] = useState<MuiDate | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isMobile = useMediaQuery('(max-width:700px)');

  const testSlotDateFormat =
    moment(selectedSlot?.start).format('DD.MM. HH:mm') +
    ' - ' +
    moment(selectedSlot?.end).format('HH:mm');

  if (slots?.length === 0) {
    return (
      <Layout title="Zasad nema dostupnih termina, ali obavijestit ćemo te mailom kad ih bude." />
    );
  }

  return (
    <Layout title={title}>
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
          if (confirmed) handleSubmit(selectedSlot!);
          setDialogOpen(false);
        }}
        title="Potvrdi odabir termina"
        description={`Tvoj termin bit će rezerviran za ${testSlotDateFormat}. Odabrani termin se ne može promijeniti!`}
      />
    </Layout>
  );
};
