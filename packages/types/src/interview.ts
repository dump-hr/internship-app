import { Json } from './json';

export type ScheduleInterviewRequest = {
  interviewSlotId: string;
  internId: string;
};

export type SetInterviewRequest = {
  internId: string;
  answers: Json;
  score: number;
};

export type SetAnswerFlagRequest = {
  slotId: string;
  questionId: string;
};
