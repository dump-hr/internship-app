import {
  InterviewEvent,
  InterviewMemberParticipation,
} from '@internship-app/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
  useFetchSlotsAvailability,
  useFetchInterviewSlots,
  useDeleteInterviewSlot,
  useCreateInterviewSlot,
} from '@api/index';

import styles from './index.module.css';
import {
  AdminPage,
  CalendarSidebar,
  SlotsList,
  Calendar,
} from '@components/index';
import { calendarHelper } from 'src/helpers';

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

  const [events, setEvents] = useState<MappedEvent[]>([]);
  const { data: interviewSlots, refetchInterviewSlots } =
    useFetchInterviewSlots();
  const { data: slotsAvailability } = useFetchSlotsAvailability();

  const deleteInterviewSlotMutation = useDeleteInterviewSlot();
  const createInterviewSlotMutation = useCreateInterviewSlot();

  function deleteEvent(event: InterviewEvent) {
    if (!event.id) return;
    deleteInterviewSlotMutation.mutate(event.id, {
      onSuccess: () => {
        refetchInterviewSlots();
      },
    });
  }

  function addEvent(event: InterviewEvent) {
    if (!event || !selectedInterviewers || !selectedInterviewers.length) {
      toast.error('Interviewers must be selected!');
      return;
    }

    const interviewSlotDto = {
      start: event.start,
      end: event.end,
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
    <AdminPage>
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
        />
      </div>
      <SlotsList data={slotsAvailability} />
    </AdminPage>
  );
};
