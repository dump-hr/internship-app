import { Discipline, DisciplineStatus, InterviewStatus, TestStatus } from "./intern";

export enum BoardActionType {
    SetInterviewStatus = 'SetInterviewStatus',
    SetDiscipline = 'SetDiscipline',
    Kick = 'Kick'
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
| {
    actionType: BoardActionType.Kick
}
)

export type BoardActionRequest = {internIds: string[], action: BoardAction}