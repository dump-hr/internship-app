export enum QuestionType {
  Field = 'Field',
  TextArea = 'TextArea',
  Select = 'Select',
  Slider = 'Slider',
  Checkbox = 'Checkbox',
  Date = 'Date',
  Radio = 'Radio',
  Number = 'Number',
}

export type Question = { id: string; title?: string, required?: boolean, registerValue? : string } & (
  | { type: QuestionType.Field }
  | { type: QuestionType.TextArea }
  | { type: QuestionType.Checkbox; options?: string[] }
  | { type: QuestionType.Slider; min: number; max: number; step: number }
  | { type: QuestionType.Select; options: string[] }
  | { type: QuestionType.Date }
  | { type: QuestionType.Radio; options: string[] }
  | { type: QuestionType.Number }
);

export type MultistepQuestion<T> = Question & {
  category: T;
};
