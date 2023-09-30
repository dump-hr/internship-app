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
  Python = 'Python',
  CPP = 'CPP',
  C = 'C',
  CS = 'CS',
  JavaScript = 'JavaScript'
}

export type Interviewer = {
  id: string;
  name: string;
  disciplines: Discipline[];
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
}

export type TestSlot = {
  discipline: Discipline;
  location: string;
  capacity: number;
  internDisciplines: InternDiscipline[];
} & Slot;

export type TestQuestion = {
  id: string;
  title: string;
  text: string;
  points: number;
  order: number;
  testSlot: TestSlot;
}

export type InternQuestionAnswer = {
  id: string;
  language: CodingLanguage;
  code: string;
  score?: number;
  question: TestQuestion;
  internDiscipline: InternDiscipline;
}

export type InterviewSlot = {
  answers: Json;
  score?: number;
} & Slot;

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
