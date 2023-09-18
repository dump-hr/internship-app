import { Discipline, DisciplineStatus, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.intern.createMany({
    data: [
      {
        email: 'ante.roca@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        data: {},
        id: 'ante-roca',
      },
    ],
  });

  await prisma.internDiscipline.createMany({
    data: [
      {
        internId: 'ante-roca',
        discipline: Discipline.Development,
        status: DisciplineStatus.Pending,
      },
    ],
  });

  await prisma.interviewSlot.createMany({
    data: [
      {
        id: '1',
        start: new Date('2021-06-01T10:00:00.000Z'),
        end: new Date('2021-06-01T10:30:00.000Z'),
        internId: 'ante-roca',
        answers: {},
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
