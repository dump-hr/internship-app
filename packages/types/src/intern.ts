export enum Field {
  Development = "Programiranje",
  Design = "Dizajn",
  Multimedia = "Multimedija",
  Marketing = "Marketing",
}

export enum EducationOrEmploymentStatus{
  Pupil = "Pupil",
  Student = "Student",
  Employed = "Employed",
  Other = "Other",
}

export enum FoundOutAboutInternshipBy{
  SocialMedia = "Social Media",
  Presentation = "Presentation",
  Media = "Media",
  Friend = "Friend",
  Other = "Other",
}

type FieldOption = {
  value: Field;
  label: string;
}

export const FieldOptions = [Field.Design, Field.Development, Field.Marketing, Field.Multimedia];