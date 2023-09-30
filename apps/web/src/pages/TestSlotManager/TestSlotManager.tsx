import 'react-big-calendar/lib/css/react-big-calendar.css';

import { TestSlotPreviewDto } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { useState } from 'react';
import { Calendar, SlotInfo } from 'react-big-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';
import toast, { LoaderIcon } from 'react-hot-toast';

import { useFetchAllTestSlots } from '../../api/useFetchAllTestSlots';
import { NewSlotEdit } from './NewSlotEdit';

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

enum SlotCardType {
  Existing = 'Existing',
  AboutToAdd = 'AboutToAdd',
}

type TestSlotCard = TestSlotPreviewDto & {
  type: SlotCardType;
};

const TestSlotManager = () => {
  const [slotsToAdd, setSlotsToAdd] = useState<TestSlotCard[]>([]);
  const [selectedEventStart, setSelectedEventStart] = useState<Date>();
  const { data: allSlots, isLoading, isError, error } = useFetchAllTestSlots();

  if (isLoading) return <LoaderIcon />;
  if (isError || allSlots === undefined) return <>Greška: {error}</>;

  const handleSelectSlot = (slot: SlotInfo) => {
    const anyOverlap = slotsToShow.some(
      (sta) => !(sta.start >= slot.end || slot.start >= sta.end),
    );
    if (anyOverlap) return toast.error('Nema preklapanja!');

    setSlotsToAdd((prev) => [
      ...prev,
      {
        start: slot.start,
        end: slot.end,
        capacity: 0,
        type: SlotCardType.AboutToAdd,
      } as TestSlotCard,
    ]);
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

  return (
    <>
      <Calendar
        localizer={localizer}
        step={20}
        style={{ height: 618, width: 685 }}
        defaultView="week"
        drilldownView={null}
        views={['week']}
        selectable={true}
        longPressThreshold={1}
        culture="hr"
        events={slotsToShow}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={(event) => setSelectedEventStart(event.start)}
        components={{
          event: ({ event }) =>
            event.type === SlotCardType.Existing ? (
              <Box>
                <Typography fontSize="10px">
                  Zauzeto: {event.internCount}/{event.capacity}
                </Typography>
                <Typography fontSize="10px">
                  Pitanja: {event.questionCount}
                </Typography>
              </Box>
            ) : (
              <Box>
                <Typography>Novi event</Typography>
                <Typography fontSize="10px">
                  Kapacitet: {event.capacity}
                </Typography>
              </Box>
            ),
        }}
      />
      {selectedEvent?.type === SlotCardType.AboutToAdd ? (
        <NewSlotEdit slot={selectedEvent} setSlots={setSlotsToAdd} />
      ) : null}
    </>
  );
};

export default TestSlotManager;
