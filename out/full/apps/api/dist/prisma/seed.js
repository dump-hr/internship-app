"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("@internship-app/types");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.intern.createMany({
        data: [
            {
                email: 'ante.roca@dump.hr',
                firstName: 'Ante',
                lastName: 'Roca',
                interviewStatus: client_1.InterviewStatus.Done,
                data: {
                    dateOfBirth: new Date('1998-10-01T00:00:00.000Z'),
                },
                id: 'ante-roca',
            },
            {
                email: 'ante.roca2@dump.hr',
                firstName: 'Ante',
                lastName: 'Roca',
                interviewStatus: client_1.InterviewStatus.Done,
                data: {},
                id: 'ante-roca2',
            },
            {
                email: 'ana.kovac@example.com',
                firstName: 'Ana',
                lastName: 'Kovač',
                interviewStatus: client_1.InterviewStatus.Pending,
                data: {
                    dateOfBirth: new Date('2003-03-01T00:00:00.000Z'),
                },
                id: 'ana-kovac',
            },
            {
                email: 'ivan.petrovic@example.com',
                firstName: 'Ivan',
                lastName: 'Petrović',
                interviewStatus: client_1.InterviewStatus.NoRight,
                data: {
                    dateOfBirth: new Date('1999-01-01T00:00:00.000Z'),
                },
                id: 'ivan-petrovic',
            },
            {
                email: 'marija.juric@example.com',
                firstName: 'Marija',
                lastName: 'Jurić',
                interviewStatus: client_1.InterviewStatus.Done,
                data: {
                    dateOfBirth: new Date('2001-10-01T00:00:00.000Z'),
                },
                id: 'marija-juric',
            },
            {
                email: 'marko.horvat@example.com',
                firstName: 'Marko',
                lastName: 'Horvat',
                interviewStatus: client_1.InterviewStatus.Missed,
                data: {
                    dateOfBirth: new Date('2001-10-01T00:00:00.000Z'),
                },
                id: 'marko-horvat',
            },
            {
                email: 'petra.milic@example.com',
                firstName: 'Petra',
                lastName: 'Milić',
                interviewStatus: client_1.InterviewStatus.PickTerm,
                data: {
                    dateOfBirth: new Date('2007-10-01T00:00:00.000Z'),
                },
                id: 'petra-milic',
            },
            {
                email: 'josip.knez@example.com',
                firstName: 'Josip',
                lastName: 'Knez',
                interviewStatus: client_1.InterviewStatus.PickTerm,
                data: {
                    dateOfBirth: new Date('2002-10-01T00:00:00.000Z'),
                },
                id: 'josip-knez',
            },
            {
                email: 'katarina.vidic@example.com',
                firstName: 'Katarina',
                lastName: 'Vidić',
                interviewStatus: client_1.InterviewStatus.PickTerm,
                data: {
                    dateOfBirth: new Date('2003-10-01T00:00:00.000Z'),
                },
                id: 'katarina-vidic',
            },
            {
                email: 'tomislav.kos@example.com',
                firstName: 'Tomislav',
                lastName: 'Koš',
                interviewStatus: client_1.InterviewStatus.Done,
                data: {
                    dateOfBirth: new Date('1995-10-01T00:00:00.000Z'),
                },
                id: 'tomislav-kos',
            },
            {
                email: 'mia.babic@example.com',
                firstName: 'Mia',
                lastName: 'Babić',
                interviewStatus: client_1.InterviewStatus.Pending,
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
                discipline: client_1.Discipline.Development,
                status: client_1.DisciplineStatus.Pending,
                testStatus: types_1.TestStatus.Done,
                testScore: 51,
                priority: 1,
            },
            {
                internId: 'ante-roca',
                discipline: client_1.Discipline.Multimedia,
                status: client_1.DisciplineStatus.Approved,
                priority: 2,
            },
            {
                internId: 'ante-roca',
                discipline: client_1.Discipline.Design,
                status: client_1.DisciplineStatus.Rejected,
                testStatus: types_1.TestStatus.Missed,
                priority: 3,
            },
            {
                internId: 'ana-kovac',
                discipline: client_1.Discipline.Development,
                status: client_1.DisciplineStatus.Pending,
                testStatus: types_1.TestStatus.Done,
                priority: 1,
            },
            {
                internId: 'ivan-petrovic',
                discipline: client_1.Discipline.Design,
                status: client_1.DisciplineStatus.Approved,
                testStatus: types_1.TestStatus.Missed,
                priority: 1,
            },
            {
                internId: 'ivan-petrovic',
                discipline: client_1.Discipline.Marketing,
                status: client_1.DisciplineStatus.Pending,
                priority: 2,
            },
            {
                internId: 'marija-juric',
                discipline: client_1.Discipline.Multimedia,
                status: client_1.DisciplineStatus.Rejected,
                priority: 1,
            },
            {
                internId: 'marko-horvat',
                discipline: client_1.Discipline.Marketing,
                status: client_1.DisciplineStatus.Pending,
                priority: 1,
            },
            {
                internId: 'petra-milic',
                discipline: client_1.Discipline.Development,
                status: client_1.DisciplineStatus.Approved,
                testStatus: types_1.TestStatus.Pending,
                priority: 1,
            },
            {
                internId: 'josip-knez',
                discipline: client_1.Discipline.Design,
                status: client_1.DisciplineStatus.Pending,
                testStatus: types_1.TestStatus.PickTerm,
                priority: 1,
            },
            {
                internId: 'katarina-vidic',
                discipline: client_1.Discipline.Multimedia,
                status: client_1.DisciplineStatus.Pending,
                priority: 1,
            },
            {
                internId: 'tomislav-kos',
                discipline: client_1.Discipline.Marketing,
                status: client_1.DisciplineStatus.Pending,
                priority: 1,
            },
            {
                internId: 'mia-babic',
                discipline: client_1.Discipline.Development,
                status: client_1.DisciplineStatus.Pending,
                testStatus: types_1.TestStatus.PickTerm,
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
                disciplines: [client_1.Discipline.Development],
            },
            {
                id: 'duje',
                name: 'Duje',
                email: 'duje@dump.hr',
                disciplines: [client_1.Discipline.Development, client_1.Discipline.Multimedia],
            },
            {
                id: 'ante',
                name: 'Ante',
                email: 'ante@dump.hr',
                disciplines: [
                    client_1.Discipline.Multimedia,
                    client_1.Discipline.Development,
                    client_1.Discipline.Marketing,
                    client_1.Discipline.Design,
                ],
            },
            {
                id: 'lovre',
                name: 'Lovre Tomić',
                email: 'lovre@dump.hr',
                disciplines: [client_1.Discipline.Development],
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
//# sourceMappingURL=seed.js.map