import 'react-big-calendar/lib/css/react-big-calendar.css';

import {
  InterviewEvent,
  InterviewMemberParticipation,
} from '@internship-app/types';
import { format, getDay, parse, startOfWeek } from 'date-fns';
import hrLocale from 'date-fns/locale/hr';
import moment from 'moment';
import { ReactNode } from 'react';
import {
  Calendar as BigCalendar,
  dateFnsLocalizer,
  EventWrapperProps,
  SlotInfo,
} from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import toast from 'react-hot-toast';

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
  interviewers: InterviewMemberParticipation[];
};

interface CustomEventWrapperProps extends EventWrapperProps {
  children?: ReactNode;
}

interface Props {
  filteredEvents: MappedEvent[];
  existingEvents: MappedEvent[];
  deleteEvent: (event: InterviewEvent) => void;
  addEvent: (event: InterviewEvent) => void;
}

export const Calendar: React.FC<Props> = ({
  filteredEvents,
  existingEvents,
  deleteEvent,
  addEvent,
}: Props) => {
  const DragAndDropCalendar = withDragAndDrop(BigCalendar);

  const handleTimeSlotAdd = (slotInfo: SlotInfo) => {
    if (calendarHelper.checkIfEventExists(existingEvents, slotInfo)) return;

    const overlappingEvents = calendarHelper.getOverlappingEvents(
      existingEvents,
      slotInfo,
    );

    if (overlappingEvents.length > 0) {
      toast.error('You cannot add overlapping events!');
      return;
    }
    const newEvent = {
      start: slotInfo.start,
      end: slotInfo.end,
    } as InterviewEvent;

    addEvent(newEvent);
  };

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
        events={existingEvents}
        components={{
          eventWrapper: (props: CustomEventWrapperProps) => {
            const isNotFiltered = !filteredEvents.includes(
              props.event as MappedEvent,
            );
            return (
              <div className={isNotFiltered ? 'greyed-out-event' : ''}>
                {props.children}
              </div>
            );
          },
          event: (props) => {
            return (
              <div>
                <EventContent
                  event={props.event as InterviewEvent}
                  eventDeleteHandler={deleteEvent}
                />
                <div className="rbc-event-info">
                  <div>
                    {format((props.event as InterviewEvent).start, 'HH:mm')}
                  </div>
                  <div>-</div>
                  <div>
                    {format((props.event as InterviewEvent).end, 'HH:mm')}
                  </div>
                </div>
              </div>
            );
          },
        }}
      />
    </div>
  );
};
