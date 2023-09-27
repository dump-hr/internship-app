import { Discipline, DisciplineStatus, InterviewStatus, TestStatus } from "./intern";

export enum BoardActionType {
    SetInterviewStatus = 'SetInterviewStatus',
    SetDiscipline = 'SetDiscipline',
    Kick = 'Kick',
    CancelInterviewSlot = 'CancelInterviewSlot',
    CancelTestSlot = 'CancelTestSlot'
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
| {
    actionType: BoardActionType.CancelInterviewSlot
}
| {
    actionType: BoardActionType.CancelTestSlot,
    discipline: Discipline
}
)

export type BoardActionRequest = {internIds: string[], action: BoardAction}