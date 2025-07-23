import { QuestionCategory } from '../../../apps/web/src/constants/interviewConstants';

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
  required?: boolean;
  registerValue?: any;
  category?: QuestionCategory;
  disabled?: boolean;
} & (
  | { type: QuestionType.Field }
  | { type: QuestionType.TextArea }
  | { type: QuestionType.Checkbox; options?: string[] }
  | {
      type: QuestionType.Slider;
      minValue: number;
      maxValue: number;
      stepValue: number;
    }
  | { type: QuestionType.Select; options: string[] }
  | { type: QuestionType.Date }
  | { type: QuestionType.DateTime }
  | { type: QuestionType.Radio; options: string[] }
  | { type: QuestionType.Number; minValue?: number; maxValue?: number }
);

export type MultistepQuestion<T> = Question & {
  category: T;
};
