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

export type Answer = {
  id: string;
  tick: boolean;
  type: string;
  value: string;
  options: string[];
  category: string;
  maxValue: number | null;
  minValue: number | null;
  question: string;
  required: boolean;
  stepValue: number | null;
};

export type InterviewSlot = {
  id: string;
  internId: string | null;
  start: Date;
  end: Date;
  answers: Answer[] | Record<string, Answer> | null;
  score: number | null;
  createdAt: Date;
  updatedAt: Date;
};
