import { TestStatus } from '@internship-app/types';
import {
  Discipline,
  DisciplineStatus,
  InterviewStatus,
  PrismaClient,
  QuestionType,
  QuestionCategory,
} from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.interviewQuestion.createMany({
    data: [
      {
        id: 'g1',
        title: 'Mjesto stanovanja (ljeto/zima)',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        id: 'g2',
        title: 'Jesi li se prethodno prijavljivao na DUMP Internship?',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        id: 'g3',
        title: 'Što znaš o DUMP-u?',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        id: 'g4',
        title: 'Očekivanja od Internshipa',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        id: 'g5',
        title: 'Imaš li laptop na kojem možeš raditi?',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        id: 'g6',
        title: 'Aktivnosti u slobodno vrijeme',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        id: 'g7',
        title:
          'Koliko si vremena spreman za izdvojiti za DUMP aktivnosti po području?',
        type: QuestionType.Field,
        category: QuestionCategory.General,
      },
      {
        id: 'p1',
        title:
          'Koliki će ti internship biti prioritet u odnosu na ostale obaveze?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        id: 'p2',
        title:
          'Misliš li da ćeš kvalitetnije odrađivati zadatke u Internshipu ako te stavimo da radiš zajedno sa drugim pripravnicima ili sam?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        id: 'p3',
        title:
          'Jesi li do sada sudjelovao u nekim projektima, na natjecanjima itd.?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        id: 'p4',
        title:
          'Kako bi reagirao da se ne slažeš sa nekim u timu oko nekih ključnih odluka prilikom rada na projektu?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        id: 'p5',
        title:
          'Misliš li da trebaš poznavati nekog za zajednički rad na projektu?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        id: 'p6',
        title: 'Želis li postati član DUMP-a, ako da zašto?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        id: 'p7',
        title: 'Gdje se vidiš za 5 godina?',
        type: QuestionType.Field,
        category: QuestionCategory.Personal,
      },
      {
        id: 'dev1',
        title: 'Zašto te zanima programiranje?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        id: 'dev2',
        title: 'Radiš li ili jesi li negdje radio/la kao developer?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        id: 'dev3',
        title:
          'Možeš li nam ispričati ukratko o projektu koji si radio/la za faks/posao/sebe?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        id: 'dev4',
        title: 'Koje programske jezike koristiš?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        id: 'dev5',
        title: 'Imaš li neke projekte (github)?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        id: 'dev6',
        title:
          'Što je tebi najzanimljivija stvar iz svijeta programiranja koju si naučio/la u zadnje vrijeme?',
        type: QuestionType.Field,
        category: QuestionCategory.Development,
      },
      {
        id: 'diz1',
        title: 'Zašto te zanima dizajn?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        id: 'diz2',
        title: 'Koje te vrste dizajna zanimaju?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        id: 'diz3',
        title: 'Što misliš na kojoj si razini znanja po pitanju dizajna?',
        type: QuestionType.Field,
        category: QuestionCategory.Design,
      },
      {
        id: 'mark1',
        title: 'Zašto te zanima marketing?',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        id: 'mark2',
        title: 'Koji dio marketinga te najviše zanima?',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        id: 'mark3',
        title: 'Smatraš li se više kreativnom ili analitičkom osobom?',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        id: 'mark4',
        title: 'Imaš li iskustva u vođenju profila na društvenim mrežama?',
        type: QuestionType.Field,
        category: QuestionCategory.Marketing,
      },
      {
        id: 'mark9',
        title: '1. pitanje iz Google forme',
        type: QuestionType.Slider,
        category: QuestionCategory.Marketing,
        min: 1,
        max: 5,
        step: 1,
      },
      {
        id: 'mark10',
        title: '2. pitanje iz Google forme',
        type: QuestionType.Slider,
        category: QuestionCategory.Marketing,
        min: 1,
        max: 5,
        step: 1,
      },
    ],
  });

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

  await prisma.interviewSlot.create({
    data: {
      id: '1',
      start: new Date('2023-10-01T10:00:00.000Z'),
      end: new Date('2023-10-01T10:30:00.000Z'),
      answers: {},
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
