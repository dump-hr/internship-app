import {
  InterviewEvent,
  InterviewMemberParticipation,
  InterviewSlot,
  InterviewStatus,
} from '@internship-app/types';
import moment from 'moment';
import { SlotInfo } from 'react-big-calendar';

type MappedEvent = {
  id: string;
  start: Date;
  end: Date;
  additionalInfo: string;
  internId?: string;
  interviewers: InterviewMemberParticipation[];
};

const parseInterviewSlotToCalendarEvent = (interviewSlot: InterviewSlot) => {
  return {
    id: interviewSlot.id,
    start: moment(interviewSlot.start).toDate(),
    end: moment(interviewSlot.end).toDate(),
    interviewers: interviewSlot.interviewers,
    internId: interviewSlot.internId,
    additionalInfo: `Interviewers: ${interviewSlot.interviewers
      .map((interviewer) => interviewer.interviewer.name)
      .join(', ')}\nIntern: ${interviewSlot?.intern?.firstName ?? 'None'} ${
      interviewSlot?.intern?.lastName ?? ''
    }\nNotes: ${interviewSlot?.notes ?? 'None'}`,
    status: interviewSlot.intern?.interviewStatus ?? InterviewStatus.PickTerm,
  };
};

const checkIfEventExists = (events: MappedEvent[], newEvent: SlotInfo) => {
  return events.some((event) => {
    return event.start === newEvent.start && event.end === newEvent.end;
  });
};

const getOverlappingEvents = (events: MappedEvent[], newEvent: SlotInfo) => {
  return events.filter((e) => {
    const isOverlap =
      moment(newEvent.start).isBetween(e.start, e.end) ||
      moment(newEvent.end).isBetween(e.start, e.end) ||
      moment(e.start).isBetween(newEvent.start, newEvent.end) ||
      moment(e.end).isBetween(newEvent.start, newEvent.end);

    return isOverlap;
  });
};

export const getDisciplinesFromEvent = (event: InterviewEvent) => {
  const arrayOfArrays = event.interviewers.map(
    (interviewer) => interviewer.interviewer.disciplines,
  );

  const flattenedArray = arrayOfArrays.flatMap((array) => array);
  const uniqueDisciplines = [...new Set(flattenedArray)];

  return uniqueDisciplines;
};

export const getColorBasedOnInterviewStatus = (status: InterviewStatus) => {
  switch (status) {
    case InterviewStatus.PickTerm:
      return '#FFC107';
    case InterviewStatus.NoRight:
      return '#28A745';
    case InterviewStatus.Done:
      return '#17A2B8';
    case InterviewStatus.Missed:
      return '#DC3545';
    case InterviewStatus.Pending:
      return '#FFC107';
    default:
      return '#FFC107';
  }
};

export const calendarHelper = {
  parseInterviewSlotToCalendarEvent,
  checkIfEventExists,
  getOverlappingEvents,
  getDisciplinesFromEvent,
};
