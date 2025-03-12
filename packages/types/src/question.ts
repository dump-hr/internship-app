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

export enum QuestionCategory {
  General = 'General',
  Personal = 'Personal',
  Development = 'Development',
  Design = 'Design',
  Marketing = 'Marketing',
  Multimedia = 'Multimedia',
  Final = 'Final',
}

export type Question = {
  id: string;
  title?: string;
  required?: boolean;
  registerValue?: any;
  isEnabled: boolean;
} & (
  | { type: QuestionType.Field }
  | { type: QuestionType.TextArea }
  | { type: QuestionType.Checkbox; options?: OptionType[] }
  | { type: QuestionType.Slider; min: number; max: number; step: number }
  | { type: QuestionType.Select; options: OptionType[] }
  | { type: QuestionType.Date }
  | { type: QuestionType.DateTime }
  | { type: QuestionType.Radio; options: OptionType[] }
  | { type: QuestionType.Number; min?: number; max?: number }
);

export type MultistepQuestion<T> = Question & {
  category: T;
};

export type QuestionAvailabilityRequest = {
  questionId: string;
  isEnabled: boolean;
};

export type OptionType = {
  id: string;
  value: string;
};

export type InterviewQuestion = {
  id: string;
  title: string;
  type: QuestionType;
  category: QuestionCategory;
  min: number | null;
  max: number | null;
  step: number | null;
  options: OptionType[];
  isEnabled: boolean;
};

export type SetInterviewQuestionRequest = {
  id: string;
  title: string;
  type: QuestionType;
  category: QuestionCategory;
  min: number | null;
  max: number | null;
  step: number | null;
  options: OptionType[];
};
