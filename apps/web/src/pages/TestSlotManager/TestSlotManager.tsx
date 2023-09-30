import 'react-big-calendar/lib/css/react-big-calendar.css';

import { TestSlot } from '@internship-app/types';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { useState } from 'react';
import { Calendar } from 'react-big-calendar';
import { dateFnsLocalizer } from 'react-big-calendar';

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
  const [events, setEvents] = useState<
    {
      start: Date;
      end: Date;
      id: string;
    }[]
  >(initialEvents);

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
        events={events}
        onSelectSlot={(slot) => console.log(slot)}
        onSelectEvent={(event) => console.log(event.id)}
        eventPropGetter={(event) => ({
          style: { background: 'purple' },
        })}
        components={{
          event: (event) => <div>{event.event.id}</div>,
        }}
      />
    </>
  );
};

export default TestSlotManager;
