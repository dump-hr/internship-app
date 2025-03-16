import { Question, QuestionType } from '@internship-app/types/';

export const applicationFormDataQuestions: Question[] = [
  {
    id: 'dq1',
    question: 'Datum rođenja:',
    type: QuestionType.Date,
    required: true,
    registerValue: 'dateOfBirth',
  },
  {
    id: 'dq2',
    question: 'Broj mobitela:',
    type: QuestionType.Number,
    required: false,
    registerValue: 'phoneNumber',
  },
  {
    id: 'dq3',
    question: 'Status obrazovanja/zaposlenja:',
    type: QuestionType.Radio,
    options: ['Student', 'Učenik', 'Zaposlen', 'Ostalo'],
    required: true,
    registerValue: 'educationOrEmploymentStatus',
  },
  {
    id: 'dq4',
    question: 'Nazive srednje škole ili fakulteta koji trenutno pohađaš:',
    type: QuestionType.Field,
    registerValue: 'highSchoolOrCollegeName',
  },
  {
    id: 'dq5',
    question: 'Razred / godina fakulteta:',
    type: QuestionType.Field,
    registerValue: 'yearOfStudy',
  },
  {
    id: 'dq6',
    question: 'Za DUMP Internship znaš putem:',
    type: QuestionType.Radio,
    options: [
      'Prijatelja ili poznanika',
      'Medija',
      'Predstavljanja na fakultetima/školama',
      'Društvenih mreža',
      'Ostalo',
    ],
    required: true,
    registerValue: 'foundOutAboutInternshipBy',
  },
  {
    id: 'dq7',
    question: 'Zašto se prijavljuješ na DUMP Internship?',
    type: QuestionType.Field,
    required: true,
    registerValue: 'reasonForApplying',
  },
];
