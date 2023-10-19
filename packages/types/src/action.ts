import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  TestStatus,
} from './intern';
import { Question } from './question';

export type ActionOption = {
  description: string;
  questions: Question[];
};

export type ActionOptions<T extends PropertyKey> = { [key in T]: ActionOption };

export enum BoardActionType {
  SetInterviewStatus = 'SetInterviewStatus',
  SetTestStatus = 'SetTestStatus',
  SetDiscipline = 'SetDiscipline',
  Kick = 'Kick',
  CancelInterviewSlot = 'CancelInterviewSlot',
  CancelTestSlot = 'CancelTestSlot',
  SumTestPoints = 'SumTestPoints',
}

export type BoardAction =
  | {
      actionType: BoardActionType.SetInterviewStatus;
      interviewStatus: InterviewStatus;
    }
  | {
      actionType: BoardActionType.SetTestStatus;
      discipline: Discipline;
      testStatus: TestStatus;
    }
  | {
      actionType: BoardActionType.SetDiscipline;
      discipline: Discipline;
      status?: DisciplineStatus;
      testStatus?: TestStatus;
    }
  | {
      actionType: BoardActionType.Kick;
    }
  | {
      actionType: BoardActionType.CancelInterviewSlot;
    }
  | {
      actionType: BoardActionType.CancelTestSlot;
      discipline: Discipline;
    }
  | {
      actionType: BoardActionType.SumTestPoints;
      discipline: Discipline;
    };

export type BoardActionRequest = { internIds: string[]; action: BoardAction };

export enum InternActionType {
  AddDiscipline = 'AddDiscipline',
  RemoveDiscipline = 'RemoveDiscipline',
}

export type InternAction =
  | {
      actionType: InternActionType.AddDiscipline;
      discipline: Discipline;
    }
  | {
      actionType: InternActionType.RemoveDiscipline;
      discipline: Discipline;
    };

export type InternActionRequest = { internId: string; action: InternAction };
