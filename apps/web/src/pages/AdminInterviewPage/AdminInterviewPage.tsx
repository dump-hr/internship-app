import moment from 'moment';
import { useEffect, useState } from 'react';

import { useCreateInterviewSlot } from '../../api/useCreateInterviewSlot';
import { useDeleteInterviewSlot } from '../../api/useDeleteInterviewSlot';
import { useFetchInterviewSlots } from '../../api/useFetchInterviewSlots';
import { Calendar } from '../../components/Calendar/Calendar';
import { CalendarSidebar } from '../../components/CalendarSidebar/CalendarSidebar';
import { calendarHelper } from '../../helpers/calendarHelper';
import styles from './index.module.css';

type Event = {};

export const AdminInterviewPage = () => {
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>();
  const [selectedInterviewers, setSelectedInterviewers] = useState<
    string[] | null
  >();
  const [events, setEvents] = useState<any[]>([]);
  const { data: interviewSlots, refetchInterviewSlots } =
    useFetchInterviewSlots();

  const deleteInterviewSlotMutation = useDeleteInterviewSlot();
  const createInterviewSlotMutation = useCreateInterviewSlot();

  function deleteEvent(event) {
    if (!event.id) return;
    deleteInterviewSlotMutation.mutate(event.id, {
      onSuccess: () => {
        refetchInterviewSlots();
      },
    });
  }

  function updateEvent() {}

  function addEvent(event) {
    if (!event || !selectedDiscipline || !selectedInterviewers) {
      console.log('Data missing');
      return;
    }

    const interviewSlotDto = {
      start: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
      end: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
      interviewers: selectedInterviewers,
    };

    createInterviewSlotMutation.mutate(interviewSlotDto, {
      onSuccess: () => {
        refetchInterviewSlots();
      },
    });
  }

  useEffect(() => {
    if (!interviewSlots) return;

    const convertedEvents = interviewSlots.map((interviewSlot) => {
      if (!interviewSlot.interviewers) return;
      return calendarHelper.parseInterviewSlotToCalendarEvent(interviewSlot);
    });

    //setEvents(calendarHelper.mergeEventsWithSameInterviewers(convertedEvents));
    setEvents(convertedEvents);
  }, [interviewSlots]);

  return (
    <div className={styles.wrapper}>
      <Calendar
        existingEvents={events}
        deleteEvent={deleteEvent}
        updateEvent={updateEvent}
        addEvent={addEvent}
      />
      <CalendarSidebar
        setDiscipline={setSelectedDiscipline}
        setInterviewers={setSelectedInterviewers}
      />
    </div>
  );
};
