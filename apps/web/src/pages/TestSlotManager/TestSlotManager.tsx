import 'react-big-calendar/lib/css/react-big-calendar.css';

import { TestSlotPreviewDto } from '@internship-app/types';
import { Box, Typography } from '@mui/material';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';
import { LoaderIcon } from 'react-hot-toast';

import { useFetchAllTestSlots } from '../../api/useFetchAllTestSlots';

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

const initialEvents = [
  {
    start: new Date('2023-10-10 12:00'),
    end: new Date('2023-10-10 14:00'),
    title: 'Dev ispit',
    id: 'ydhasuhf',
  },
];

const TestSlotManager = () => {
  const [slotToAdd, setSlotToAdd] = useState<TestSlotPreviewDto>();
  const { data: allSlots, isLoading, isError, error } = useFetchAllTestSlots();

  if (isLoading) return <LoaderIcon />;
  if (isError || allSlots === undefined) return <>Greška: {error}</>;

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
        events={slotToAdd ? [...allSlots, slotToAdd] : allSlots}
        onSelectSlot={(slot) => console.log(slot)}
        onSelectEvent={(event) => console.log(event.id)}
        eventPropGetter={(event) => ({
          style: { background: 'purple' },
        })}
        components={{
          event: ({ event }) => (
            <Box>
              <Typography>
                Zauzeto {event.internCount}/{event.capacity}
              </Typography>
              <Typography>Pitanja: {event.questionCount}</Typography>
            </Box>
          ),
        }}
      />
    </>
  );
};

export default TestSlotManager;
