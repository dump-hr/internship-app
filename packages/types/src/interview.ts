import { Json } from "./json";

export type ScheduleInterviewRequest = {
  interviewSlotId: string;
  internId: string;
};

export type SetInterviewRequest = {
  answers: Json
}