import { Discipline, TestSlot } from "./intern";

export type ScheduleTestRequest = {
    testSlotId: string;
    internId: string;
  };

export type TestSlotPreviewDto = Omit<TestSlot, 'internDisciplines' | 'testQuestions'> & {
  internCount: number;
  questionCount: number;
}

export type CreateTestSlotDto = {
  discipline: Discipline;
  start: Date;
  end: Date;
  capacity: number;
  location: string;
}