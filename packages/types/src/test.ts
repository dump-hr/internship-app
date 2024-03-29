import {
  CodingLanguage,
  Discipline,
  Slot,
  TestQuestion,
  TestSlot,
} from './intern';

export type ScheduleTestRequest = {
  testSlotId: string;
  internId: string;
  discipline: Discipline;
};

export type TestSlotPreviewDto = Omit<
  TestSlot,
  'internDisciplines' | 'testQuestions'
> & {
  internCount: number;
  questionCount: number;
};

export type CreateTestSlotsRequest = {
  discipline: Discipline;
  start: Date;
  end: Date;
  capacity: number;
  location: string;
  password: string;
}[];

export type UpdateTestSlotRequest = {
  testSlotId: string;
  data: TestSlot;
};

export type StartTestRequest = {
  testSlotId: string;
  internEmail: string;
  password?: string;
};

export type Test = {
  discipline: Discipline;
  location: string;
  capacity: number;
  maxPoints: number;
  testQuestions: TestQuestion[];
} & Slot;

export type SubmitTestRequest = {
  testSlotId: string;
  internEmail: string;
  password?: string;
  answers: SubmitTestAnswer[];
};

export type SubmitTestAnswer = {
  code: string;
  language: CodingLanguage;
  questionId: string;
};

export type SetScoreRequest = {
  answerId: string;
  score: number;
};

export type SpawnProgramRequest = {
  pid: string;
  language: CodingLanguage;
  code: string;
};

export type SendStdinRequest = {
  pid: string;
  text: string;
};

export type ChooseTestRequest = {
  password: string;
}
