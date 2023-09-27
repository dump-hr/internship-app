import 'react-big-calendar/lib/css/react-big-calendar.css';

import { Event } from '@internship-app/types';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  SlotInfo,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { calendarHelper } from '../../helpers/calendarHelper';
import { EventContent } from './EventContent';
import styles from './index.module.css';

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

type MappedEvent = {
  id: string;
  start: Date;
  end: Date;
  additionalInfo: string;
  interviewers: string[];
};

interface Props {
  existingEvents: MappedEvent[];
  deleteEvent: (event: Event) => void;
  addEvent: (event: Event) => void;
}

export const Calendar: React.FC<Props> = ({
  existingEvents,
  deleteEvent,
  addEvent,
}: Props) => {
  const [events, setEvents] = useState(existingEvents);
  const DragAndDropCalendar = withDragAndDrop(BigCalendar);

  const handleTimeSlotAdd = (slotInfo: SlotInfo) => {
    console.log('SLOT INFO: ', slotInfo);
    if (calendarHelper.checkIfEventExists(events, slotInfo)) return;

    const overlappingEvents = calendarHelper.getOverlappingEvents(
      events,
      slotInfo,
    );

    overlappingEvents.forEach(deleteEvent);

    const newMergedEvent = calendarHelper.getMergedEvent(
      overlappingEvents,
      slotInfo,
    );

    addEvent(newMergedEvent);
  };

  useEffect(() => {
    setEvents(existingEvents);
  }, [existingEvents]);

  return (
    <div>
      <DragAndDropCalendar
        step={20}
        localizer={localizer}
        style={{ height: 618, width: 685 }}
        defaultView="week"
        drilldownView={null}
        views={['week']}
        selectable={true}
        resizable={true}
        draggableAccessor={() => true}
        longPressThreshold={1}
        culture="hr"
        className={styles.wrapper}
        onSelectSlot={handleTimeSlotAdd}
        events={events}
        components={{
          event: (event) => (
            <>
              <EventContent
                event={event.event}
                eventDeleteHandler={deleteEvent}
              />
              <div className="rbc-event-info">
                <div>{format((event.event as Event).start, 'HH:mm')}</div>
                <div>-</div>
                <div>{format((event.event as Event).end, 'HH:mm')}</div>
              </div>
            </>
          ),
        }}
      />
    </div>
  );
};
