import { QuestionCategory } from 'web/src/constants/interviewConstants';
import { QuestionType } from '.';

export type InterviewQuestion = {
  id?: string;
  question: string;
  type: QuestionType;
  category: QuestionCategory;
  minValue?: Number;
  maxValue?: Number;
  stepValue?: Number;
  isEnabled: boolean;
  options?: string[];
};
