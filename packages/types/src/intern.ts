import { Json } from './json';

export enum Discipline {
  Development = 'Development',
  Design = 'Design',
  Multimedia = 'Multimedia',
  Marketing = 'Marketing',
}

export enum EducationOrEmploymentStatus {
  Pupil = 'Pupil',
  Student = 'Student',
  Employed = 'Employed',
  Other = 'Other',
}

export enum FoundOutAboutInternshipBy {
  Presentation = 'Presentation',
  Media = 'Media',
  Friend = 'Friend',
  SocialMedia = 'SocialMedia',
  Other = 'Other',
}

export enum DisciplineStatus {
  Pending = 'Pending',
  Approved = 'Approved',
  Rejected = 'Rejected',
}

export enum InterviewStatus {
  NoRight = 'NoRight',
  PickTerm = 'PickTerm',
  Pending = 'Pending',
  Done = 'Done',
  Missed = 'Missed',
}

export enum TestStatus {
  PickTerm = 'PickTerm',
  Pending = 'Pending',
  Done = 'Done',
  Missed = 'Missed',
}

export enum CodingLanguage {
  JavaScript = 'JavaScript',
  Python = 'Python',
  CSharp = 'CSharp',
  CPP = 'CPP',
  C = 'C',
  Java = 'Java',
  Go = 'Go',
}

export enum InternLogAction {
  OpenStatusPage = 'OpenStatusPage',
  OpenInterviewPage = 'OpenInterviewPage',
  OpenTestPage = 'OpenTestPage'
}

export enum AdminLogAction {
  Create = "Create",
  Update = "Update",
  Delete = "Delete",
  Email = "Email",
}

export type Interviewer = {
  id: string;
  name: string;
  disciplines: Discipline[];
  email?: string;
};

export type Intern = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  data: Json;
  interviewStatus: InterviewStatus;
  interviewSlot?: InterviewSlot;
  internDisciplines: InternDiscipline[];
  logs: InternLog[];
};

export type InternCreateRequest = {
  firstName: string;
  lastName: string;
  email: string;
  data: Json;
};

export type InternDiscipline = {
  discipline: Discipline;
  priority: number;
  status: DisciplineStatus;
  testStatus?: TestStatus;
  testScore?: number;
  testSlot?: TestSlot;
  internId: string;
  intern: Intern;
};

export type Slot = {
  id: string;
  start: Date;
  end: Date;
};

export type TestSlot = {
  discipline: Discipline;
  location: string;
  capacity: number;
  maxPoints: number;
  internDisciplines: InternDiscipline[];
  testQuestions: TestQuestion[];
} & Slot;

export type TestQuestion = {
  id: string;
  title: string;
  text: string;
  points: number;
  order: number;
  testSlot: TestSlot;
};

export type InternQuestionAnswer = {
  id: string;
  language: CodingLanguage;
  code: string;
  score?: number;
  question: TestQuestion;
  internDiscipline: InternDiscipline;
};

export type InterviewSlot = {
  id: string;
  start: Date;
  end: Date;
  answers: Json;
  score?: number;
  notes?: string;
  interviewers: InterviewMemberParticipation[];
  intern: Intern;
};

export type InterviewMemberParticipation = {
  id: string;
  interviewerId: string;
  interviewer: Interviewer;
  interviewSlotId: string;
  interviewSlot: InterviewSlot;
};

export type InternLog = {
  id: string;
  intern: Intern;
  internId: string;
  action: InternLogAction;
  date: Date;
}

export type AdminLog = {
  id: string;
  action: AdminLogAction;
  description: string;
  date: Date;
}

export type InterviewEvent = {
  id: string;
  start: Date;
  end: Date;
  title: string;
  additionalInfo: string;
  interviewers: InterviewMemberParticipation[];
  notes: string;
  status: InterviewStatus;
};

export type CreateInterviewSlotDto = {
  start: string;
  end: string;
  interviewers: string[];
  notes?: string;
};

export enum InternStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export type InternWithStatus = Intern & { status: InternStatus };

export type InternDecisionRequest = {
  internId: string;
  disciplines: {
    discipline: Discipline;
    status: DisciplineStatus;
  }[];
};
