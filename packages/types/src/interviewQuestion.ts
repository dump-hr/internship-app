import { QuestionCategory, QuestionType } from './question';

export type InterviewQuestion = {
  id: string;
  title: string;
  type: QuestionType;
  category: QuestionCategory;
  min?: number;
  max?: number;
  step?: number;
  options?: string[];
  isActive?: boolean;
};
