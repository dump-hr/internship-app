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

export enum InterviewQuestionType {
  Field = 'Field',
  TextArea = 'TextArea',
  Select = 'Select',
  Slider = 'Slider',
  Checkbox = 'Checkbox',
  Date = 'Date',
  DateTime = 'DateTime',
  Radio = 'Radio',
  Number = 'Number',
}

export enum InterviewQuestionCategory {
  General = 'General',
  Personal = 'Personal',
  Development = 'Development',
  Design = 'Design',
  Marketing = 'Marketing',
  Multimedia = 'Multimedia',
  Final = 'Final',
}

export type InterviewQuestion = {
  id: string;
  question: string;
  type: InterviewQuestionType;
  category: InterviewQuestionCategory;
  details?: InterviewQuestionDetails;
};

export type InterviewQuestionDetails = {
  id: string;
  questionId: string;
  options: string[];
  min: number;
  max: number;
  step: number;
};
