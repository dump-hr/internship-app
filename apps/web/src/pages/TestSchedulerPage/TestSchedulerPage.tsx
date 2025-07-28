import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Discipline } from '@internship-app/types';
import { Box, Button, Typography } from '@mui/material';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, SlotInfo } from 'react-big-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';
import toast, { LoaderIcon } from 'react-hot-toast';

import { useCreateTestSlots } from '../../api/useCreateTestSlots';
import { useFetchAllTestSlots } from '../../api/useFetchAllTestSlots';
import AdminPage from '../../components/AdminPage';
import { ExistingSlotInfo } from './ExistingSlotInfo';
import { NewSlotEdit } from './NewSlotEdit';
import { SlotCard } from './SlotCard';
import { SlotCardType, TestSlotCard } from './types';

moment.locale('hr');
const locales = {
  hr: hrLocale,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export const TestSchedulerPage = () => {
  const [slotsToAdd, setSlotsToAdd] = useState<TestSlotCard[]>([]);
  const [selectedEventStart, setSelectedEventStart] = useState<Date>();

  const createTestSlots = useCreateTestSlots();
  const { data: allSlots, isLoading, error } = useFetchAllTestSlots();

  if (isLoading) return <LoaderIcon />;
  if (error || allSlots === undefined) return <>Greška: {error}</>;

  const handleSelectSlot = (slot: SlotInfo) => {
    const anyOverlap = slotsToShow.some(
      (sta) => !(sta.start >= slot.end || slot.start >= sta.end),
    );
    if (anyOverlap) return toast.error('Nije dozvoljeno preklapanje!');

    const newSlot = {
      start: slot.start,
      end: slot.end,
      capacity: 0,
      location: '',
      discipline: Discipline.Development,
      type: SlotCardType.AboutToAdd,
    } as TestSlotCard;
    setSlotsToAdd((prev) => [...prev, newSlot]);
  };

  const handleSubmit = () => {
    createTestSlots.mutate(slotsToAdd, { onSuccess: () => setSlotsToAdd([]) });
  };

  const allSlotsMapped = allSlots.map(
    (s) =>
      ({
        ...s,
        type: SlotCardType.Existing,
      }) as TestSlotCard,
  );
  const slotsToShow = [...allSlotsMapped, ...slotsToAdd];
  const selectedEvent = slotsToShow.find(
    (s) => s.start === selectedEventStart,
  )!;

  const getSidebar = (slot: TestSlotCard) => {
    switch (slot?.type) {
      case SlotCardType.Existing:
        return <ExistingSlotInfo slotId={selectedEvent.id} />;
      case SlotCardType.AboutToAdd:
        return <NewSlotEdit slot={selectedEvent} setSlots={setSlotsToAdd} />;
      default:
        return <Typography>Klikni na event za detalje</Typography>;
    }
  };

  return (
    <AdminPage>
      <Typography variant="h2">Testovi ({slotsToShow.length})</Typography>
      <Box display="flex" gap="40px">
        <Box>
          <Button variant="contained" onClick={handleSubmit}>
            Pohrani
          </Button>
          <Calendar
            localizer={localizer}
            step={10}
            style={{ height: 618, width: 1000 }}
            defaultView="week"
            views={['week']}
            selectable={true}
            scrollToTime={new Date()}
            culture="hr"
            events={slotsToShow}
            onSelectSlot={handleSelectSlot}
            onSelectEvent={(event) => setSelectedEventStart(event.start)}
            components={{
              event: ({ event }) => <SlotCard slot={event} />,
            }}
          />
        </Box>
        <Box width="200px" marginTop="100px">
          {getSidebar(selectedEvent)}
        </Box>
      </Box>
    </AdminPage>
  );
};
