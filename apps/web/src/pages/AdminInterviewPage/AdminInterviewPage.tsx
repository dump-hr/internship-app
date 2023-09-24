import { useEffect, useState } from 'react';

import { useCreateInterviewSlot } from '../../api/useCreateInterviewSlot';
import { useDeleteInterviewSlot } from '../../api/useDeleteInterviewSlot';
import { useFetchInterviewSlotsByDiscipline } from '../../api/useFetchInterviewSlots';
import { Calendar } from '../../components/Calendar/Calendar';
import { CalendarSidebar } from '../../components/CalendarSidebar/CalendarSidebar';
import { calendarHelper } from '../../helpers/calendarHelper';
import styles from './index.module.css';

type Event = {};

export const AdminInterviewPage = () => {
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState<string | null>();
  const [selectedInterviewers, setSelectedInterviewers] = useState<
    string[] | null
  >();
  const [events, setEvents] = useState<any[]>([]);
  // const { data: interviewSlots } = useFetchInterviewSlotsByDiscipline(
  //   selectedDiscipline || '',
  // );

  const deleteInterviewSlotMutation = useDeleteInterviewSlot(null);
  const createInterviewSlotMutation = useCreateInterviewSlot();

  function deleteEvent(event) {
    if (!event.id) return;
    deleteInterviewSlotMutation.mutate(event.id);
  }

  function updateEvent() {}

  function addEvent(event) {
    console.log('Event', event.start, event.end);
    if (!event || !selectedDiscipline || !selectedInterviewers) return;
    //TODO handle if it is not divisible by 20 minutes
    const interviewSlotDto = {
      start: event.start.toString(),
      end: event.end.toString(),
      interviewers: selectedInterviewers,
    };

    createInterviewSlotMutation.mutate(interviewSlotDto);
  }

  // useEffect(() => {
  //   if (!interviewSlots) return;

  //   const convertedEvents = interviewSlots.map((interviewSlot) =>
  //     calendarHelper.parseInterviewSlotToCalendarEvent(interviewSlot),
  //   );

  //   setEvents(convertedEvents);
  // }, [interviewSlots]);

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
