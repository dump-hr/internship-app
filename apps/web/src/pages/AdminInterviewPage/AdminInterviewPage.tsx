import { InteractionType } from '@azure/msal-browser';
import { useMsalAuthentication } from '@azure/msal-react';
import {
  InterviewEvent,
  InterviewMemberParticipation,
} from '@internship-app/types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { useCreateInterviewSlot } from '../../api/useCreateInterviewSlot';
import { useDeleteInterviewSlot } from '../../api/useDeleteInterviewSlot';
import { useFetchInterviewSlots } from '../../api/useFetchInterviewSlots';
import { useFetchSlotsAvailability } from '../../api/useFetchSlotsAvailability';
import AdminPage from '../../components/AdminPage';
import { Calendar } from '../../components/Calendar/Calendar';
import { CalendarSidebar } from '../../components/CalendarSidebar/CalendarSidebar';
import SlotsList from '../../components/SlotsList/SlotsList';
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
  useMsalAuthentication(InteractionType.Redirect);

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
