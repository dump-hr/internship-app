import 'react-big-calendar/lib/css/react-big-calendar.css';

import { format, getDay, parse, set, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

import { EventContent } from './EventContent';
import styles from './index.module.css';

interface Props {
  selectedDiscipline?: string;
}

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

export const Calendar: React.FC<Props> = ({ selectedDiscipline }: Props) => {
  const [events, setEvents] = useState([]);
  const DragAndDropCalendar = withDragAndDrop(BigCalendar);

  const handleTimeSlotAdd = (slotInfo: any) => {
    setEvents((prev) => [...prev, slotInfo]);
    console.log('ADD', slotInfo.start, slotInfo.end);
  };
  const handleTimeSlotEdit = (slotInfo: any) => {
    console.log('EDIT', slotInfo);
  };
  const deleteEvent = (event: any) => {
    console.log('DELETE', event);
    setEvents((prev) => prev.filter((e) => e !== event));
  };

  return (
    <div>
      <DragAndDropCalendar
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
