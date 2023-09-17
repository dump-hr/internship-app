import 'react-big-calendar/lib/css/react-big-calendar.css';

import { format, getDay, parse, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { useState } from 'react';
import { Calendar as BigCalendar, dateFnsLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';

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

export const Calendar = () => {
  const [events, setEvents] = useState([]);
  const DragAndDropCalendar = withDragAndDrop(BigCalendar);

  const handleTimeSlotAdd = (slotInfo: any) => {
    console.log('ADD', slotInfo);
  };
  const handleTimeSlotEdit = (slotInfo: any) => {
    console.log('EDIT', slotInfo);
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
      />
    </div>
  );
};
