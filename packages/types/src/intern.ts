export enum Field {
  Development = "Development",
  Design = "Design",
  Multimedia = "Multimedia",
  Marketing = "Marketing",
}

export enum FieldInCroatian {
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

export const mapFieldToCroatian = (field: Field) => {
  switch (field) {
    case Field.Development:
      return FieldInCroatian.Development;
    case Field.Design:
      return FieldInCroatian.Design;
    case Field.Multimedia:
      return FieldInCroatian.Multimedia;
    case Field.Marketing:
      return FieldInCroatian.Marketing;
  }
}