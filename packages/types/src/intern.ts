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

export enum EducationOrEmploymentStatusInCroatian{
  Pupil = "Učenik",
  Student = "Student",
  Employed = "Zaposlen",
  Other = "Ostalo",
}

export enum FoundOutAboutInternshipBy{
  Presentation = "Presentation",
  SocialMedia = "Social Media",
  Media = "Media",
  Friend = "Friend",
  Other = "Other",
}

export enum FoundOutAboutInternshipByInCroatian{
  Presentation = "Predstavljanja na fakultetima/školama",
  SocialMedia = "Društvenih mreža",
  Media = "Medija",
  Friend = "Prijatelja ili poznanika",
  Other = "Ostalo",
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

export const mapEducationOrEmploymentStatusToCroatian = (status: EducationOrEmploymentStatus) => {
  switch (status) {
    case EducationOrEmploymentStatus.Pupil:
      return EducationOrEmploymentStatusInCroatian.Pupil;
    case EducationOrEmploymentStatus.Student:
      return EducationOrEmploymentStatusInCroatian.Student;
    case EducationOrEmploymentStatus.Employed:
      return EducationOrEmploymentStatusInCroatian.Employed;
    case EducationOrEmploymentStatus.Other:
      return EducationOrEmploymentStatusInCroatian.Other;
  }
}

export const mapFoundOutAboutInternshipByToCroatian = (foundOutBy: FoundOutAboutInternshipBy) => {
  switch (foundOutBy) {
    case FoundOutAboutInternshipBy.SocialMedia:
      return FoundOutAboutInternshipByInCroatian.SocialMedia;
    case FoundOutAboutInternshipBy.Presentation:
      return FoundOutAboutInternshipByInCroatian.Presentation;
    case FoundOutAboutInternshipBy.Media:
      return FoundOutAboutInternshipByInCroatian.Media;
    case FoundOutAboutInternshipBy.Friend:
      return FoundOutAboutInternshipByInCroatian.Friend;
    case FoundOutAboutInternshipBy.Other:
      return FoundOutAboutInternshipByInCroatian.Other;
  }
}