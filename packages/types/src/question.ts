export enum QuestionType {
  Field = 'Field',
  TextArea = 'TextArea',
  Select = 'Select',
  Slider = 'Slider',
  Checkbox = 'Checkbox',
}

export type Question = { id: string; title?: string } & (
  | { type: QuestionType.Field }
  | { type: QuestionType.TextArea }
  | { type: QuestionType.Checkbox }
  | { type: QuestionType.Slider; min: number; max: number; step: number }
  | { type: QuestionType.Select; options: string[] }
);

export type MultistepQuestion<T> = Question & {
  category: T;
};
