import { Question, QuestionType } from '@internship-app/types/';

export const applicationFormDataQuestions: Question[] = [
  {
    id: 'dq1',
    title: 'Datum rođenja:',
    type: QuestionType.Date,
    required: true,
    registerValue: 'dateOfBirth',
  },
  {
    id: 'dq2',
    title: 'Broj mobitela:',
    type: QuestionType.Number,
    required: false,
    registerValue: 'phoneNumber',
  },
  {
    id: 'dq3',
    title: 'Status obrazovanja/zaposlenja:',
    type: QuestionType.Radio,
    options: ['Student', 'Učenik', 'Zaposlen', 'Ostalo'],
    required: true,
    registerValue: 'educationOrEmploymentStatus',
  },
  {
    id: 'dq4',
    title: 'Nazive srednje škole ili fakulteta koji trenutno pohađaš:',
    type: QuestionType.Field,
    registerValue: 'highSchoolOrCollegeName',
  },
  {
    id: 'dq5',
    title: 'Za DUMP internship si saznao/la putem:',
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
    id: 'dq6',
    title: 'Zašto se prijavljuješ na DUMP internship?',
    type: QuestionType.Field,
    required: true,
    registerValue: 'reasonForApplying',
  },
];
