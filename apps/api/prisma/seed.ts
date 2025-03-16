import { TestStatus } from '@internship-app/types';
import {
  Discipline,
  DisciplineStatus,
  InterviewQuestionCategory,
  InterviewQuestionType,
  InterviewStatus,
  PrismaClient,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.intern.createMany({
    data: [
      {
        email: 'ante.roca@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('1998-10-01T00:00:00.000Z'),
        },
        id: 'ante-roca',
      },
      {
        email: 'ante.roca2@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        interviewStatus: InterviewStatus.Done,
        data: {},
        id: 'ante-roca2',
      },
      {
        email: 'ana.kovac@example.com',
        firstName: 'Ana',
        lastName: 'Kovač',
        interviewStatus: InterviewStatus.Pending,
        data: {
          dateOfBirth: new Date('2003-03-01T00:00:00.000Z'),
        },
        id: 'ana-kovac',
      },
      {
        email: 'ivan.petrovic@example.com',
        firstName: 'Ivan',
        lastName: 'Petrović',
        interviewStatus: InterviewStatus.NoRight,
        data: {
          dateOfBirth: new Date('1999-01-01T00:00:00.000Z'),
        },
        id: 'ivan-petrovic',
      },
      {
        email: 'marija.juric@example.com',
        firstName: 'Marija',
        lastName: 'Jurić',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('2001-10-01T00:00:00.000Z'),
        },
        id: 'marija-juric',
      },
      {
        email: 'marko.horvat@example.com',
        firstName: 'Marko',
        lastName: 'Horvat',
        interviewStatus: InterviewStatus.Missed,
        data: {
          dateOfBirth: new Date('2001-10-01T00:00:00.000Z'),
        },
        id: 'marko-horvat',
      },
      {
        email: 'petra.milic@example.com',
        firstName: 'Petra',
        lastName: 'Milić',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2007-10-01T00:00:00.000Z'),
        },
        id: 'petra-milic',
      },
      {
        email: 'josip.knez@example.com',
        firstName: 'Josip',
        lastName: 'Knez',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2002-10-01T00:00:00.000Z'),
        },
        id: 'josip-knez',
      },
      {
        email: 'katarina.vidic@example.com',
        firstName: 'Katarina',
        lastName: 'Vidić',
        interviewStatus: InterviewStatus.PickTerm,
        data: {
          dateOfBirth: new Date('2003-10-01T00:00:00.000Z'),
        },
        id: 'katarina-vidic',
      },
      {
        email: 'tomislav.kos@example.com',
        firstName: 'Tomislav',
        lastName: 'Koš',
        interviewStatus: InterviewStatus.Done,
        data: {
          dateOfBirth: new Date('1995-10-01T00:00:00.000Z'),
        },
        id: 'tomislav-kos',
      },
      {
        email: 'mia.babic@example.com',
        firstName: 'Mia',
        lastName: 'Babić',
        interviewStatus: InterviewStatus.Pending,
        data: {
          dateOfBirth: new Date('2000-10-01T00:00:00.000Z'),
        },
        id: 'mia-babic',
      },
    ],
  });

  await prisma.internDiscipline.createMany({
    data: [
      {
        internId: 'ante-roca',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.Done,
        testScore: 51,
        priority: 1,
      },
      {
        internId: 'ante-roca',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Approved,
        priority: 2,
      },
      {
        internId: 'ante-roca',
        discipline: Discipline.Design,
        status: DisciplineStatus.Rejected,
        testStatus: TestStatus.Missed,
        priority: 3,
      },
      {
        internId: 'ana-kovac',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.Done,
        priority: 1,
      },
      {
        internId: 'ivan-petrovic',
        discipline: Discipline.Design,
        status: DisciplineStatus.Approved,
        testStatus: TestStatus.Missed,
        priority: 1,
      },
      {
        internId: 'ivan-petrovic',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 2,
      },
      {
        internId: 'marija-juric',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Rejected,
        priority: 1,
      },
      {
        internId: 'marko-horvat',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'petra-milic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Approved,
        testStatus: TestStatus.Pending,
        priority: 1,
      },
      {
        internId: 'josip-knez',
        discipline: Discipline.Design,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.PickTerm,
        priority: 1,
      },
      {
        internId: 'katarina-vidic',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'tomislav-kos',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'mia-babic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.PickTerm,
        priority: 1,
      },
    ],
  });

  await prisma.interviewer.createMany({
    data: [
      {
        id: 'frane',
        name: 'Frane',
        email: 'frane@dump.hr',
        disciplines: [Discipline.Development],
      },
      {
        id: 'duje',
        name: 'Duje',
        email: 'duje@dump.hr',
        disciplines: [Discipline.Development, Discipline.Multimedia],
      },
      {
        id: 'ante',
        name: 'Ante',
        email: 'ante@dump.hr',
        disciplines: [
          Discipline.Multimedia,
          Discipline.Development,
          Discipline.Marketing,
          Discipline.Design,
        ],
      },
      {
        id: 'lovre',
        name: 'Lovre Tomić',
        email: 'lovre@dump.hr',
        disciplines: [Discipline.Development],
      },
    ],
  });

  await prisma.interviewQuestion.createMany({
    data: [
      {
        id: 'g1',
        question: 'Mjesto stanovanja (ljeto/zima)',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.General,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'g2',
        question: 'Jesi li se prethodno prijavljivao na DUMP Internship?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.General,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'g3',
        question: 'Što znaš o DUMP-u?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.General,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'g4',
        question: 'Očekivanja od Internshipa',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.General,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'g5',
        question: 'Imaš li laptop na kojem možeš raditi?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.General,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'g6',
        question: 'Aktivnosti u slobodno vrijeme',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.General,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'g7',
        question:
          'Koliko si vremena spreman za izdvojiti za DUMP aktivnosti po području? (izvući točnu brojku i vidjeti je li realna)',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.General,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Personal
      {
        id: 'p1',
        question:
          'Koliki će ti internship biti prioritet u odnosu na ostale obaveze?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Personal,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p2',
        question:
          'Misliš li da ćeš kvalitetnije odrađivati zadatke u Internshipu ako te stavimo da radiš zajedno sa drugim pripravnicima ili sam?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Personal,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p3',
        question:
          'Jesi li do sada sudjelovao u nekim projektima, na natjecanjima itd.?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Personal,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p4',
        question:
          'Kako bi reagirao da se ne slažeš sa nekim u timu oko nekih ključnih odluka prilikom rada na projektu?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Personal,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p5',
        question:
          'Misliš li da trebaš poznavati nekog za zajednički rad na projektu?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Personal,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p6',
        question: 'Želiš li postati član DUMP-a, ako da zašto?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Personal,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'p7',
        question: 'Gdje se vidiš za 5 godina?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Personal,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Development (DisciplineSpecific)
      {
        id: 'dev1',
        question: 'Zašto te zanima programiranje?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Development,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'dev2',
        question: 'Radiš li ili jesi li negdje radio/la kao developer?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Development,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'dev3',
        question:
          'Možeš li nam ispričati ukratko o projektu koji si radio/la za faks/posao/sebe?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Development,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'dev4',
        question:
          'Koje programske jezike koristiš? (koji ti je draži, zašto, koliko iskustva ima sa tim jezikom, je li entuzijastičan oko ijednog)',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Development,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'dev5',
        question: 'Imaš li neke projekte (GitHub)?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Development,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'dev6',
        question:
          'Što je tebi najzanimljivija stvar iz svijeta programiranja koju si naučio/la u zadnje vrijeme? Ili topic koji bi htio naučiti u budućnosti?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Development,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Design (DisciplineSpecific)
      {
        id: 'diz1',
        question: 'Zašto te zanima dizajn?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Design,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'diz2',
        question: 'Koje te vrste dizajna zanimaju?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Design,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'diz3',
        question: 'Što misliš na kojoj si razini znanja po pitanju dizajna?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Design,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'diz4',
        question: 'Koje programe poznaješ?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Design,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'diz5',
        question: 'Imaš li neke svoje radove? Možeš li nam pokazati/poslati?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Design,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'diz6',
        question: 'Pratiš li neke dizajnere i ako da koje?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Design,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Marketing (DisciplineSpecific)
      {
        id: 'mark1',
        question: 'Zašto te zanima marketing?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Marketing,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'mark2',
        question: 'Koji dio marketinga te najviše zanima?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Marketing,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 'mark3',
        question: 'Imaš li neku edukaciju vezano uz marketing?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.DisciplineSpecific,
        discipline: Discipline.Marketing,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Final
      {
        id: 'fin1',
        question: 'Zašto te zanima život?',
        type: InterviewQuestionType.TextArea,
        category: InterviewQuestionCategory.Final,
        discipline: null,
        isEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
  });

  await prisma.interviewQuestionAnswer.createMany({
    data: [
      {
        id: 'a1',
        questionId: 'g1',
        internId: 'ante-roca',
        answer: 'Video games',
        flag: false,
      },
      {
        id: 'a2',
        questionId: 'g1',
        internId: 'ante-roca',
        answer: 'Movies',
        flag: false,
      },
    ],
  });

  await prisma.interviewSlot.create({
    data: {
      id: '1',
      start: new Date('2023-10-01T10:00:00.000Z'),
      end: new Date('2023-10-01T10:30:00.000Z'),
      answers: {},
      internId: 'ana-kovac',
      interviewers: {
        createMany: {
          data: [{ interviewerId: 'frane' }, { interviewerId: 'duje' }],
        },
      },
    },
  });

  await prisma.interviewSlot.create({
    data: {
      id: '2',
      start: new Date('2023-10-01T10:30:00.000Z'),
      end: new Date('2023-10-01T11:00:00.000Z'),
      answers: {},
      internId: 'mia-babic',
      interviewers: {
        createMany: {
          data: [{ interviewerId: 'frane' }],
        },
      },
    },
  });

  await prisma.admin.createMany({
    data: [
      {
        email: 'admin@dump.hr',
        password: await bcrypt.hash('dump.1950', 10),
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
