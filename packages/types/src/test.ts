import { Discipline, TestSlot } from "./intern";

export type ScheduleTestRequest = { 
    testSlotId: string;
    internId: string;
    discipline: Discipline;
  };

export type TestSlotPreviewDto = Omit<TestSlot, 'internDisciplines' | 'testQuestions'> & {
  internCount: number;
  questionCount: number;
}

export type CreateTestSlotsRequest = {
  discipline: Discipline;
  start: Date;
  end: Date;
  capacity: number;
  location: string;
}[]

export type UpdateTestSlotRequest = {
  testSlotId: string;
  data: TestSlot;
}
