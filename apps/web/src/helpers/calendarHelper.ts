import { InterviewSlot, InterviewSlotDto } from '@internship-app/types';
import moment from 'moment';

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

const mergeEventsWithSameInterviewers = (events) => {
  events.sort((a, b) => a.start.getTime() - b.start.getTime());

  let i = 0;
  while (i < events.length - 1) {
    const currentEvent = events[i];
    const nextEvent = events[i + 1];

    if (
      JSON.stringify(currentEvent.interviewers) ===
        JSON.stringify(nextEvent.interviewers) &&
      currentEvent.end.getTime() === nextEvent.start.getTime()
    ) {
      currentEvent.end = nextEvent.end;
      events.splice(i + 1, 1);
    } else {
      i++;
    }
  }

  return events;
};

export const getDisciplinesFromEvent = (event) => {
  const arrayOfArrays = event.interviewers.map(
    (interviewer) => interviewer.interviewer.disciplines,
  );

  const flattenedArray = arrayOfArrays.flatMap((array) => array);
  const uniqueDisciplines = [...new Set(flattenedArray)];

  return uniqueDisciplines;
};

export const calendarHelper = {
  parseInterviewSlotToCalendarEvent,
  parseCalendarEventToInterviewSlot,
  checkIfEventExists,
  getOverlappingEvents,
  getMergedEvent,
  mergeEventsWithSameInterviewers,
  getDisciplinesFromEvent,
};
