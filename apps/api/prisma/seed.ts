import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.intern.createMany({
    data: [
      {
        email: 'ante.roca@dump.hr',
        firstName: 'Ante',
        lastName: 'Roca',
        data: {},
        interview: {},
      },
    ],
  });

  await prisma.admin.createMany({
    data: [
      {
        email: 'admin@dump.hr',
        password:
          '$2a$12$tCUVgcBjqQ.XDIepFQ4oZ.z47tmy5h8KnWH7xgXgUib8/Wn1E6bIW', //dump.1950
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
