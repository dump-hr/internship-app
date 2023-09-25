import { InterviewSlot, InterviewSlotDto } from '@internship-app/types';
import moment from 'moment';

const parseInterviewSlotToCalendarEvent = (interviewSlot: InterviewSlot) => {
  return {
    id: interviewSlot.id,
    start: new Date(interviewSlot.start),
    end: new Date(interviewSlot.end),
    additionalInfo: `Interviewers: ${interviewSlot.interviewers
      .map((interviewer) => interviewer.interviewer.name)
      .join(', ')}`,
  };
};

const parseCalendarEventToInterviewSlot = (start: Date, end: Date) => {
  return {} as InterviewSlotDto;
};

const checkIfEventExists = (events, newEvent) => {
  return events.some((event) => {
    return event.start === newEvent.start && event.end === newEvent.end;
  });
};

const checkIfDateIsBetween = (date: Date, start: Date, end: Date) => {
  return date >= start && date <= end;
};

const getOverlappingEvents = (events, newEvent) => {
  return events.filter((e) => {
    const isOverlap =
      checkIfDateIsBetween(e.start, newEvent.start, newEvent.end) ||
      checkIfDateIsBetween(e.end, newEvent.start, newEvent.end) ||
      checkIfDateIsBetween(newEvent.start, e.start, e.end) ||
      checkIfDateIsBetween(newEvent.end, e.start, e.end);

    return isOverlap;
  });
};

const getMergedEvent = (events, newEvent) => {
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

export const calendarHelper = {
  parseInterviewSlotToCalendarEvent,
  parseCalendarEventToInterviewSlot,
  checkIfEventExists,
  getOverlappingEvents,
  getMergedEvent,
};
