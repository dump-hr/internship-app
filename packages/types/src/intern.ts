import { Json } from './json';
import { Question } from './question';

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
  OpenTestPage = 'OpenTestPage',
}

export enum AdminLogAction {
  Create = 'Create',
  Update = 'Update',
  Delete = 'Delete',
  Email = 'Email',
}

export type Interviewer = {
  id: string;
  name: string;
  disciplines: Discipline[];
  email?: string;
};

export type InterviewerWithStats = Interviewer & {
  _count: {
    interviews: number;
  },
  _avg: {
    score: number;
  }
};

export type Intern = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  image?: string;
  data: Json;
  notes: string;
  interviewStatus: InterviewStatus;
  interviewSlot?: InterviewSlot;
  internDisciplines: InternDiscipline[];
  logs: InternLog[];
  createdAt: Date;
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
  testSlotId?: string;
  internId: string;
  intern: Intern;
  internQuestionAnswers: InternQuestionAnswer[];
};

export type Slot = {
  id: string;
  start: Date;
  end: Date;
};

export type SlotAvailability = {
  disciplines: Discipline[];
  available: number;
  needed: number;
};

export type TestSlot = {
  discipline: Discipline;
  location: string;
  capacity: number;
  maxPoints: number;
  password: string;
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
  interviewers: InterviewMemberParticipation[];
  internId?: string;
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
};

export type AdminLog = {
  id: string;
  action: AdminLogAction;
  description: string;
  date: Date;
};

export type InterviewEvent = {
  id: string;
  start: Date;
  end: Date;
  title: string;
  additionalInfo: string;
  interviewers: InterviewMemberParticipation[];
  status: InterviewStatus;
};

export type CreateInterviewSlotDto = {
  start: Date;
  end: Date;
  interviewers: string[];
};

export enum InternStatus {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected',
}

export type InternForDashboard = Intern & { status: InternStatus, _count:  { logs: number }  };

export type InternDecisionRequest = {
  internId: string;
  disciplines: {
    discipline: Discipline;
    status: DisciplineStatus;
  }[];
};

export type CreateNoteRequest = {
  internId: string;
  note: string;
};

export type CriteriaSection = {
  id: string;
  questions: Question[];
};

export type DisciplineCriteria = {
  discipline?: Discipline;
  status?: DisciplineStatus;
  testStatus?: TestStatus;
  score?: number;
  not?: boolean;
};

export type MainCriteria = {
  name?: string;
  status?: InternStatus;
  interviewStatus?: InterviewStatus;
};
