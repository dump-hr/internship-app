import { Discipline, DisciplineStatus, InterviewStatus, TestStatus } from "./intern";

export enum BoardAction {
    SetInterviewStatus = 'SetInterviewStatus',
    SetDiscipline = 'SetDiscipline',
  }

export type BoardActionRequest = {internIds: string[]} &
(
    | {
        actionType: BoardAction.SetInterviewStatus,
        interviewStatus: InterviewStatus
    }
    | {
        actionType: BoardAction.SetDiscipline,
        discipline: Discipline,
        status?: DisciplineStatus,
        testStatus?: TestStatus
    }
)