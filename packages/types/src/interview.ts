import { Json } from './json';
import { QuestionAnswer } from './question';

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

export type InterviewDetails = {
  answer: QuestionAnswer;
  intern: {
    id: string;
    firstName: string;
    lastName: string;
  };
  slotId: string;
};
