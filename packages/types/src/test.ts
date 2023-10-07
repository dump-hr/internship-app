import { Discipline, Slot, TestQuestion, TestSlot } from './intern';

export type ScheduleTestRequest = {
  testSlotId: string;
  internId: string;
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
}[];

export type UpdateTestSlotRequest = {
  testSlotId: string;
  data: TestSlot;
};

export type StartTestRequest = {
  testSlotId: string;
  internEmail: string;
};

export type Test = {
  discipline: Discipline;
  location: string;
  capacity: number;
  maxPoints: number;
  testQuestions: TestQuestion[];
} & Slot;
