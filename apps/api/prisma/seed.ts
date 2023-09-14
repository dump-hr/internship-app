import { Discipline, PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  await prisma.intern.create({
    data: {
      email: 'ante.roca@dump.hr',
      firstName: 'Ante',
      lastName: 'Roca',
      data: {},
      internDisciplines: {
        create: {
          discipline: Discipline.Development,
          priority: 1,
          status: 'Pending',
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
