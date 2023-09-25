import { Discipline, DisciplineStatus, InterviewStatus, TestStatus } from "./intern";

export enum BoardActionType {
    SetInterviewStatus = 'SetInterviewStatus',
    SetDiscipline = 'SetDiscipline',
  }

export type BoardAction =   (| {
    actionType: BoardActionType.SetInterviewStatus,
    interviewStatus: InterviewStatus
}
| {
    actionType: BoardActionType.SetDiscipline,
    discipline: Discipline,
    status?: DisciplineStatus,
    testStatus?: TestStatus
}
)

export type BoardActionRequest = {internIds: string[], action: BoardAction}