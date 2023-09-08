export enum Discipline {
  Development = "Development",
  Design = "Design",
  Multimedia = "Multimedia",
  Marketing = "Marketing",
}

export enum EducationOrEmploymentStatus{
  Pupil = "Pupil",
  Student = "Student",
  Employed = "Employed",
  Other = "Other",
}

export enum FoundOutAboutInternshipBy{
  Presentation = "Presentation",
  Media = "Media",
  Friend = "Friend",
  SocialMedia = "SocialMedia",
  Other = "Other",
}

export type Intern = {
  firstName: string;
  lastName: string;
  email: string;
  disciplines: Discipline[];
  data: {
    phoneNumber: number;
    dateOfBirth: string;
    educationOrEmploymentStatus: EducationOrEmploymentStatus;
    highSchoolOrCollegeName: string;
    foundOutAboutInternshipBy: FoundOutAboutInternshipBy;
    reasonForApplying: string;
  };
};