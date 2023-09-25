import 'react-big-calendar/lib/css/react-big-calendar.css';

import { format, getDay, parse, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
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

interface Props {
  existingEvents: any[];
  deleteEvent: (event: any) => void;
  updateEvent: (event: any) => void;
  addEvent: (event: any) => void;
}

export const Calendar: React.FC<Props> = ({
  existingEvents,
  deleteEvent,
  updateEvent,
  addEvent,
}: Props) => {
  const [events, setEvents] = useState(existingEvents);
  const DragAndDropCalendar = withDragAndDrop(BigCalendar);

  const handleTimeSlotAdd = (slotInfo: any) => {
    if (calendarHelper.checkIfEventExists(events, slotInfo)) return;

    const overlappingEvents = calendarHelper.getOverlappingEvents(
      events,
      slotInfo,
    );

    overlappingEvents.forEach(deleteEvent); // --> mutation

    const newMergedEvent = calendarHelper.getMergedEvent(
      overlappingEvents,
      slotInfo,
    );

    addEvent(newMergedEvent); // --> api

    //setEvents((prev) => [...prev, newMergedEvent]);
  };

  const handleTimeSlotEdit = (editedSlotInfo: any) => {
    if (!events) return;

    const overlappingEvents = calendarHelper.getOverlappingEvents(
      events,
      editedSlotInfo,
    );
    overlappingEvents
      .filter(
        (event) =>
          event.start !== editedSlotInfo.start &&
          event.end !== editedSlotInfo.end,
      )
      .forEach(deleteEvent); // --> mutation

    const mergedEvent = calendarHelper.getMergedEvent(
      overlappingEvents,
      editedSlotInfo,
    );
    setEvents((prev) => [...prev, mergedEvent]);
    //updateEvent({ ...mergedEvent, id: editedSlotInfo.id }); --> api
  };

  const handleTimeSlotSelect = (event: any) => {
    // open modal with details or maybe tooltip
  };

  useEffect(() => {
    console.log('UPDATED EVENTS STATE: ', existingEvents);
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
        onEventResize={(e) => handleTimeSlotEdit(e)}
        onEventDrop={(e) => handleTimeSlotEdit(e)}
        onSelectEvent={(e) => handleTimeSlotSelect(e)}
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
