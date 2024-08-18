import { TestStatus } from '@internship-app/types';
import {
  Discipline,
  DisciplineStatus,
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

  const createdTestSlots = await prisma.testSlot.createManyAndReturn({
    data: [
      {
        discipline: Discipline.Development,
        start: new Date('2023-10-01T10:00:00.000Z'),
        end: new Date('2023-10-01T10:30:00.000Z'),
        location: 'Test Location 1',
        capacity: 10,
        maxPoints: 50,
        password: 'dump1234',
      },
      {
        discipline: Discipline.Design,
        start: new Date('2023-10-01T10:30:00.000Z'),
        end: new Date('2023-10-01T11:00:00.000Z'),
        location: 'Test Location 2',
        capacity: 10,
        maxPoints: 50,
        password: 'dump1234',
      },
      {
        discipline: Discipline.Multimedia,
        start: new Date('2023-10-01T11:00:00.000Z'),
        end: new Date('2025-10-01T11:30:00.000Z'),
        location: 'Test Location 3',
        capacity: 10,
        maxPoints: 50,
        password: 'dump1234',
      },
      {
        discipline: Discipline.Marketing,
        start: new Date('2023-10-01T11:30:00.000Z'),
        end: new Date('2023-10-01T12:00:00.000Z'),
        location: 'Test Location 4',
        capacity: 10,
        maxPoints: 50,
        password: 'dump1234',
      },
      {
        discipline: Discipline.Marketing,
        start: new Date('2023-10-01T12:00:00.000Z'),
        end: new Date('2023-10-01T12:30:00.000Z'),
        location: 'Test Location 5',
        capacity: 10,
        maxPoints: 50,
        password: 'dump1234',
      },
      {
        capacity: 10,
        discipline: Discipline.Development,
        end: new Date('2023-10-01T10:30:00.000Z'),
        location: 'Test Location 1',
        maxPoints: 50,
        password: 'dump1234',
        start: new Date('2023-10-01T10:00:00.000Z'),
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
        testSlotId: createdTestSlots[0].id,
      },
      {
        internId: 'ante-roca',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Approved,
        priority: 2,
        testSlotId: createdTestSlots[2].id,
      },
      {
        internId: 'ante-roca',
        discipline: Discipline.Design,
        status: DisciplineStatus.Rejected,
        testStatus: TestStatus.Missed,
        testSlotId: createdTestSlots[1].id,
        priority: 3,
      },
      {
        internId: 'ana-kovac',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.Done,
        testSlotId: createdTestSlots[0].id,
        priority: 1,
      },
      {
        internId: 'ivan-petrovic',
        discipline: Discipline.Design,
        status: DisciplineStatus.Approved,
        testStatus: TestStatus.Missed,
        priority: 1,
        testSlotId: createdTestSlots[1].id,
      },
      {
        internId: 'ivan-petrovic',
        testSlotId: createdTestSlots[1].id,
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 2,
      },
      {
        testSlotId: createdTestSlots[2].id,
        internId: 'marija-juric',
        discipline: Discipline.Multimedia,
        status: DisciplineStatus.Rejected,
        priority: 1,
      },
      {
        internId: 'marko-horvat',
        discipline: Discipline.Marketing,
        testSlotId: createdTestSlots[3].id,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'petra-milic',
        discipline: Discipline.Development,
        status: DisciplineStatus.Approved,
        testStatus: TestStatus.Pending,
        testSlotId: createdTestSlots[4].id,
        priority: 1,
      },
      {
        internId: 'josip-knez',
        discipline: Discipline.Design,
        status: DisciplineStatus.Pending,
        testSlotId: createdTestSlots[1].id,
        testStatus: TestStatus.PickTerm,
        priority: 1,
      },
      {
        internId: 'katarina-vidic',
        discipline: Discipline.Multimedia,
        testSlotId: createdTestSlots[2].id,
        status: DisciplineStatus.Pending,
        priority: 1,
      },
      {
        internId: 'tomislav-kos',
        discipline: Discipline.Marketing,
        status: DisciplineStatus.Pending,
        priority: 1,
        testSlotId: createdTestSlots[3].id,
      },
      {
        internId: 'mia-babic',
        testSlotId: createdTestSlots[0].id,
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
        testStatus: TestStatus.PickTerm,
        priority: 1,
      },
    ],
  });

  const createdTestQuestions = await prisma.testQuestion.createManyAndReturn({
    data: [
      {
        title: 'Test Question 1',
        text: 'This is the first test question',
        points: 10,
        order: 1,
        testSlotId: createdTestSlots[0].id,
      },
      {
        title: 'Test Question 2',
        text: 'This is the second test question',
        points: 10,
        order: 2,
        testSlotId: createdTestSlots[0].id,
      },
      {
        title: 'Test Question 3',
        text: 'This is the third test question',
        points: 10,
        order: 3,
        testSlotId: createdTestSlots[1].id,
      },
      {
        title: 'Test Question 4',
        text: 'This is the fourth test question',
        points: 10,
        order: 4,
        testSlotId: createdTestSlots[1].id,
      },
      {
        title: 'Test Question 5',
        text: 'This is the fifth test question',
        points: 10,
        order: 5,
        testSlotId: createdTestSlots[2].id,
      },
      {
        title: 'Test Question 6',
        text: 'This is the sixth test question',
        points: 10,
        order: 6,
        testSlotId: createdTestSlots[2].id,
      },
      {
        title: 'Test Question 7',
        text: 'This is the seventh test question',
        points: 10,
        order: 7,
        testSlotId: createdTestSlots[3].id,
      },
      {
        title: 'Test Question 8',
        text: 'This is the eighth test question',
        points: 10,
        order: 8,
        testSlotId: createdTestSlots[3].id,
      },
      {
        title: 'Test Question 9',
        text: 'This is the ninth test question',
        points: 10,
        order: 9,
        testSlotId: createdTestSlots[4].id,
      },
      {
        title: 'Test Question 10',
        text: 'This is the tenth test question',
        points: 10,
        order: 10,
        testSlotId: createdTestSlots[4].id,
      },
    ],
  });

  const createdTestCaseClusters =
    await prisma.testCaseCluster.createManyAndReturn({
      data: [
        {
          name: 'Cluster 1',
          description: 'Test Case Cluster 1',
          testQuestionId: createdTestQuestions[0].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 2',
          description: 'Test Case Cluster 2',
          testQuestionId: createdTestQuestions[1].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 3',
          description: 'Test Case Cluster 3',
          testQuestionId: createdTestQuestions[2].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 4',
          description: 'Test Case Cluster 4',
          testQuestionId: createdTestQuestions[3].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 5',
          description: 'Test Case Cluster 5',
          testQuestionId: createdTestQuestions[4].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 6',
          description: 'Test Case Cluster 6',
          testQuestionId: createdTestQuestions[5].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 7',
          description: 'Test Case Cluster 7',
          testQuestionId: createdTestQuestions[6].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 8',
          description: 'Test Case Cluster 8',
          testQuestionId: createdTestQuestions[7].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 9',
          description: 'Test Case Cluster 9',
          testQuestionId: createdTestQuestions[8].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
        {
          name: 'Cluster 10',
          description: 'Test Case Cluster 10',
          testQuestionId: createdTestQuestions[9].id,
          maxExecutionTime: 1000,
          maxMemory: 256,
          points: 10,
        },
      ],
    });

  await prisma.testCase.createManyAndReturn({
    data: [
      {
        testCaseClusterId: createdTestCaseClusters[0].id,
        input: ['input1', 'input2', 'input3'],
        expectedOutput: ['output1', 'output2', 'output3'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[0].id,
        input: ['input4', 'input5', 'input6'],
        expectedOutput: ['output4', 'output5', 'output6'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[0].id,
        input: ['input7', 'input8', 'input9'],
        expectedOutput: ['output7', 'output8', 'output9'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[1].id,
        input: ['input10', 'input11', 'input12'],
        expectedOutput: ['output10', 'output11', 'output12'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[1].id,
        input: ['input13', 'input14', 'input15'],
        expectedOutput: ['output13', 'output14', 'output15'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[1].id,
        input: ['input16', 'input17', 'input18'],
        expectedOutput: ['output16', 'output17', 'output18'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[2].id,
        input: ['input19', 'input20', 'input21'],
        expectedOutput: ['output19', 'output20', 'output21'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[2].id,
        input: ['input22', 'input23', 'input24'],
        expectedOutput: ['output22', 'output23', 'output24'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[2].id,
        input: ['input25', 'input26', 'input27'],
        expectedOutput: ['output25', 'output26', 'output27'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[3].id,
        input: ['input28', 'input29', 'input30'],
        expectedOutput: ['output28', 'output29', 'output30'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[3].id,
        input: ['input31', 'input32', 'input33'],
        expectedOutput: ['output31', 'output32', 'output33'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[4].id,
        input: ['input34', 'input35', 'input36'],
        expectedOutput: ['output34', 'output35', 'output36'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[4].id,
        input: ['input37', 'input38', 'input39'],
        expectedOutput: ['output37', 'output38', 'output39'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[5].id,
        input: ['input40', 'input41', 'input42'],
        expectedOutput: ['output40', 'output41', 'output42'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[5].id,
        input: ['input43', 'input44', 'input45'],
        expectedOutput: ['output43', 'output44', 'output45'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[6].id,
        input: ['input46', 'input47', 'input48'],
        expectedOutput: ['output46', 'output47', 'output48'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[6].id,
        input: ['input49', 'input50', 'input51'],
        expectedOutput: ['output49', 'output50', 'output51'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[7].id,
        input: ['input52', 'input53', 'input54'],
        expectedOutput: ['output52', 'output53', 'output54'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[7].id,
        input: ['input55', 'input56', 'input57'],
        expectedOutput: ['output55', 'output56', 'output57'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[8].id,
        input: ['input58', 'input59', 'input60'],
        expectedOutput: ['output58', 'output59', 'output60'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[8].id,
        input: ['input61', 'input62', 'input63'],
        expectedOutput: ['output61', 'output62', 'output63'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[9].id,
        input: ['input64', 'input65', 'input66'],
        expectedOutput: ['output64', 'output65', 'output66'],
      },
      {
        testCaseClusterId: createdTestCaseClusters[9].id,
        input: ['input67', 'input68', 'input69'],
        expectedOutput: ['output67', 'output68', 'output69'],
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
