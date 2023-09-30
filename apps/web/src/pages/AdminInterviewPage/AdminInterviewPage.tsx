import { Event, InterviewMemberParticipation } from '@internship-app/types';
import moment from 'moment';
import { useEffect, useState } from 'react';

import { useCreateInterviewSlot } from '../../api/useCreateInterviewSlot';
import { useDeleteInterviewSlot } from '../../api/useDeleteInterviewSlot';
import { useFetchInterviewSlots } from '../../api/useFetchInterviewSlots';
import { Calendar } from '../../components/Calendar/Calendar';
import { CalendarSidebar } from '../../components/CalendarSidebar/CalendarSidebar';
import { calendarHelper } from '../../helpers/calendarHelper';
import styles from './index.module.css';

type MappedEvent = {
  id: string;
  start: Date;
  end: Date;
  additionalInfo: string;
  interviewers: InterviewMemberParticipation[];
};

export const AdminInterviewPage = () => {
  const [interviewerFilter, setInterviewerFilter] = useState<
    string[] | null | undefined
  >();
  const [filteredEvents, setFilteredEvents] = useState<MappedEvent[]>([]);
  const [selectedInterviewers, setSelectedInterviewers] = useState<
    string[] | null
  >();
  const [additionalNotesValue, setAdditionalNotesValue] = useState<
    string | undefined
  >();
  const [events, setEvents] = useState<MappedEvent[]>([]);
  const { data: interviewSlots, refetchInterviewSlots } =
    useFetchInterviewSlots(null);

  const deleteInterviewSlotMutation = useDeleteInterviewSlot();
  const createInterviewSlotMutation = useCreateInterviewSlot();

  function deleteEvent(event: Event) {
    if (!event.id) return;
    deleteInterviewSlotMutation.mutate(event.id, {
      onSuccess: () => {
        refetchInterviewSlots();
      },
    });
  }

  function addEvent(event: Event) {
    if (!event || !selectedInterviewers || !selectedInterviewers.length) {
      return;
    }

    const interviewSlotDto = {
      start: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
      end: moment(event.end).format('YYYY-MM-DD HH:mm:ss'),
      interviewers: selectedInterviewers,
      notes: additionalNotesValue || '',
    };

    createInterviewSlotMutation.mutate(interviewSlotDto, {
      onSuccess: () => {
        refetchInterviewSlots();
      },
    });
  }

  useEffect(() => {
    if (!interviewSlots || !interviewSlots.every((slot) => slot.interviewers)) {
      return;
    }

    const convertedEvents = interviewSlots.map((interviewSlot) => {
      if (!interviewSlot?.interviewers)
        return undefined as unknown as MappedEvent;
      return calendarHelper.parseInterviewSlotToCalendarEvent(interviewSlot);
    });

    setEvents(convertedEvents as MappedEvent[]);
  }, [interviewSlots]);

  useEffect(() => {
    if (!events || !interviewerFilter || interviewerFilter.length === 0) {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((slot) => {
        return slot.interviewers.reduce((found, interviewer) => {
          {
            return (
              found || interviewerFilter.includes(interviewer.interviewerId)
            );
          }
        }, false);
      });
      setFilteredEvents(filtered);
    }
  }, [events, interviewerFilter]);

  return (
    <div className={styles.wrapper}>
      <Calendar
        filteredEvents={filteredEvents}
        existingEvents={events}
        deleteEvent={deleteEvent}
        addEvent={addEvent}
      />
      <CalendarSidebar
        setSelectedInterviewerFilter={setInterviewerFilter}
        setInterviewers={setSelectedInterviewers}
        setAdditionalNotesValue={setAdditionalNotesValue}
      />
    </div>
  );
};
