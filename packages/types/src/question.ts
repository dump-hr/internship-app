import { QuestionCategory } from 'web/src/constants/interviewConstants';

export enum QuestionType {
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

export type Question = {
  id: string;
  question?: string;
  category: QuestionCategory;
  isEnabled: boolean;
  title?: string;
  required?: boolean;
  registerValue?: any;
} & (
  | { type: QuestionType.Field }
  | { type: QuestionType.TextArea }
  | { type: QuestionType.Checkbox; options?: string[] }
  | { type: QuestionType.Slider; min: number; max: number; step: number }
  | { type: QuestionType.Select; options: string[] }
  | { type: QuestionType.Date }
  | { type: QuestionType.DateTime }
  | { type: QuestionType.Radio; options: string[] }
  | { type: QuestionType.Number; min?: number; max?: number }
);

export type MultistepQuestion<T> = Question & {
  category: T;
};
