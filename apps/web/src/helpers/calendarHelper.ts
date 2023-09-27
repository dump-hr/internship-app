import { InterviewSlot } from '@internship-app/types';
import moment from 'moment';
import { SlotInfo } from 'react-big-calendar';

type MappedEvent = {
  id: string;
  start: Date;
  end: Date;
  additionalInfo: string;
  interviewers: string[];
};

const parseInterviewSlotToCalendarEvent = (interviewSlot: InterviewSlot) => {
  return {
    id: interviewSlot.id,
    start: moment(interviewSlot.start).toDate(),
    end: moment(interviewSlot.end).toDate(),
    interviewers: interviewSlot.interviewers,
    additionalInfo: `Interviewers: ${interviewSlot.interviewers
      .map((interviewer) => interviewer.interviewer.name)
      .join(', ')}\nNotes: ${interviewSlot?.notes ?? 'None'}`,
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

const getMergedEvent = (events: MappedEvent[], newEvent: SlotInfo) => {
  if (!events.length) return newEvent;
  events.push(newEvent);
  const mergedStartTime = moment.min(
    events.map((existingEvent) => moment(existingEvent.start)),
  );
  const mergedEndTime = moment.max(
    events.map((existingEvent) => moment(existingEvent.end)),
  );

  return {
    start: mergedStartTime.toDate(),
    end: mergedEndTime.toDate(),
  };
};

export const getDisciplinesFromEvent = (event: InterviewSlot) => {
  const arrayOfArrays = event.interviewers.map(
    (interviewer) => interviewer.interviewer.disciplines,
  );

  const flattenedArray = arrayOfArrays.flatMap((array) => array);
  const uniqueDisciplines = [...new Set(flattenedArray)];

  return uniqueDisciplines;
};

export const calendarHelper = {
  parseInterviewSlotToCalendarEvent,
  checkIfEventExists,
  getOverlappingEvents,
  getMergedEvent,
  getDisciplinesFromEvent,
};
