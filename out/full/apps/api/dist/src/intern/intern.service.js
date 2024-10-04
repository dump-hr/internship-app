"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternService = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const postmark = require("postmark");
const prisma_service_1 = require("../prisma.service");
const disposableEmailBlocklist = require("./disposable-email-blocklist.json");
let InternService = class InternService {
    constructor(prisma) {
        this.prisma = prisma;
        this.s3 = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
            region: 'eu-central-1',
        });
        this.postmark = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
    }
    async get(id) {
        return await this.prisma.intern.findUnique({
            where: { id },
            include: {
                internDisciplines: {
                    include: {
                        testSlot: true,
                    },
                    orderBy: {
                        priority: 'asc',
                    },
                },
                interviewSlot: {
                    include: {
                        interviewers: {
                            include: {
                                interviewer: true,
                            },
                        },
                    },
                },
                logs: {
                    orderBy: {
                        date: 'desc',
                    },
                },
            },
        });
    }
    async getAll() {
        const interns = await this.prisma.intern.findMany({
            include: {
                internDisciplines: {
                    orderBy: {
                        priority: 'asc',
                    },
                },
                interviewSlot: {
                    select: {
                        score: true,
                    },
                },
                _count: {
                    select: {
                        logs: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'asc',
            },
        });
        return interns;
    }
    async getApplicationStatus(id) {
        const applicationInfo = await this.prisma.intern.findUnique({
            where: { id },
            select: {
                firstName: true,
                lastName: true,
                email: true,
                interviewStatus: true,
                internDisciplines: {
                    select: {
                        discipline: true,
                        status: true,
                        testStatus: true,
                        testScore: true,
                        testSlot: {
                            select: {
                                start: true,
                                end: true,
                            },
                        },
                        internQuestionAnswers: {
                            select: {
                                score: true,
                                question: {
                                    select: {
                                        points: true,
                                    },
                                },
                            },
                            orderBy: {
                                question: {
                                    order: 'asc',
                                },
                            },
                        },
                    },
                },
                interviewSlot: {
                    select: {
                        start: true,
                        end: true,
                    },
                },
            },
        });
        return applicationInfo;
    }
    async create(internToCreate) {
        const internWithTheSameEmail = await this.prisma.intern.findFirst({
            where: {
                email: {
                    equals: internToCreate.email,
                    mode: 'insensitive',
                },
            },
        });
        if (internWithTheSameEmail) {
            throw new common_1.BadRequestException('Intern with the same email already exists');
        }
        const internDateOfBirth = new Date(internToCreate.data.dateOfBirth);
        const milisecondsInYear = 1000 * 60 * 60 * 24 * 365;
        const internAgeInMiliseconds = new Date().getTime() - internDateOfBirth.getTime();
        if (internAgeInMiliseconds / milisecondsInYear < 10 ||
            internAgeInMiliseconds / milisecondsInYear > 35) {
            throw new common_1.BadRequestException('Birth date out of range');
        }
        const isDisposableEmail = disposableEmailBlocklist.includes(internToCreate.email.split('@')[1]);
        if (isDisposableEmail) {
            throw new common_1.BadRequestException('Disposable email is not allowed');
        }
        const initialInterviewStatus = internToCreate.disciplines.some((dis) => dis === client_1.Discipline.Development)
            ? client_1.InterviewStatus.NoRight
            : client_1.InterviewStatus.PickTerm;
        const newIntern = await this.prisma.intern.create({
            data: {
                firstName: internToCreate.firstName,
                lastName: internToCreate.lastName,
                email: internToCreate.email,
                data: internToCreate.data,
                interviewStatus: initialInterviewStatus,
                internDisciplines: {
                    createMany: {
                        data: internToCreate.disciplines.map((dis, index) => ({
                            discipline: dis,
                            priority: index,
                            status: client_1.DisciplineStatus.Pending,
                            testStatus: this.getInitialTestStatus(dis),
                        })),
                    },
                },
            },
        });
        this.postmark.sendEmail({
            From: 'info@dump.hr',
            To: internToCreate.email,
            Subject: 'Prijava na DUMP Internship',
            TextBody: `Pozdrav ${internToCreate.firstName},

Hvala na prijavi na DUMP Internship 2023. Uskoro ćemo te obavijestiti o sljedećim koracima prijave.
Ako imaš pitanja oko internshipa ili procesa prijave slobodno nam se javi na info@dump.hr

U svakom trenutku možeš provjeriti status svoje prijave na https://internship.dump.hr/status/${newIntern.id}

Lijep pozdrav,

DUMP Udruga mladih programera
dump.hr`,
            MessageStream: 'outbound',
        });
        return newIntern;
    }
    async setInterview(internId, data) {
        await this.prisma.intern.update({
            where: {
                id: internId,
            },
            data: {
                interviewStatus: client_1.InterviewStatus.Done,
                interviewSlot: {
                    update: { answers: data.answers, score: data.score },
                },
            },
        });
    }
    async setImage(internId, buffer) {
        const key = `intern-images/${internId}-${new Date().getTime()}.png`;
        const command = new client_s3_1.PutObjectCommand({
            Bucket: 'internship-app-uploads',
            Key: key,
            Body: buffer,
            ContentType: 'image/png',
        });
        try {
            await this.s3.send(command);
            const image = `https://internship-app-uploads.dump.hr/${key}`;
            await this.prisma.intern.update({
                where: {
                    id: internId,
                },
                data: {
                    image,
                },
            });
            return image;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async applyAction(internId, action) {
        switch (action.actionType) {
            case 'AddDiscipline':
                return await this.prisma.intern.update({
                    where: {
                        id: internId,
                        internDisciplines: {
                            none: {
                                discipline: action.discipline,
                            },
                        },
                    },
                    data: {
                        internDisciplines: {
                            create: {
                                discipline: action.discipline,
                                status: client_1.DisciplineStatus.Pending,
                                testStatus: this.getInitialTestStatus(action.discipline),
                                priority: -1,
                            },
                        },
                    },
                });
            case 'RemoveDiscipline':
                const internDisciplines = await this.prisma.internDiscipline.findMany({
                    where: { internId },
                    select: { discipline: true },
                });
                if (internDisciplines.length < 2)
                    throw new common_1.BadRequestException('Intern should have at least 2 disciplines!');
                return this.prisma.internDiscipline.delete({
                    where: {
                        internId_discipline: {
                            internId: internId,
                            discipline: action.discipline,
                        },
                    },
                });
            default:
                throw new common_1.BadRequestException();
        }
    }
    async applyBoardAction(action, internIds) {
        switch (action.actionType) {
            case 'SetInterviewStatus':
                return await this.prisma.intern.updateMany({
                    where: { id: { in: internIds } },
                    data: { interviewStatus: action.interviewStatus },
                });
            case 'SetTestStatus':
                return await this.prisma.internDiscipline.updateMany({
                    where: { internId: { in: internIds }, discipline: action.discipline },
                    data: { testStatus: action.testStatus },
                });
            case 'SetDiscipline':
                return await this.prisma.internDiscipline.updateMany({
                    where: { internId: { in: internIds }, discipline: action.discipline },
                    data: Object.assign(Object.assign({}, (action.status && { status: action.status })), (action.testStatus && { testStatus: action.testStatus })),
                });
            case 'Kick':
                await this.prisma.interviewSlot.updateMany({
                    where: {
                        intern: {
                            id: { in: internIds },
                            interviewStatus: client_1.InterviewStatus.Pending,
                        },
                    },
                    data: { internId: null },
                });
                await this.prisma.intern.updateMany({
                    where: {
                        id: { in: internIds },
                        interviewStatus: {
                            in: [client_1.InterviewStatus.PickTerm, client_1.InterviewStatus.Pending],
                        },
                    },
                    data: {
                        interviewStatus: client_1.InterviewStatus.NoRight,
                    },
                });
                await this.prisma.internDiscipline.updateMany({
                    where: {
                        internId: { in: internIds },
                        testStatus: {
                            in: [client_1.TestStatus.PickTerm, client_1.TestStatus.Pending],
                        },
                    },
                    data: { testSlotId: null, testStatus: null },
                });
                return await this.prisma.internDiscipline.updateMany({
                    where: { internId: { in: internIds } },
                    data: {
                        status: client_1.DisciplineStatus.Rejected,
                    },
                });
            case 'CancelInterviewSlot':
                const internFilter = {
                    id: { in: internIds },
                    interviewStatus: client_1.InterviewStatus.Pending,
                };
                await this.prisma.interviewSlot.updateMany({
                    where: {
                        intern: internFilter,
                    },
                    data: {
                        internId: null,
                    },
                });
                return await this.prisma.intern.updateMany({
                    where: internFilter,
                    data: {
                        interviewStatus: client_1.InterviewStatus.PickTerm,
                    },
                });
            case 'CancelTestSlot':
                return await this.prisma.internDiscipline.updateMany({
                    where: {
                        internId: { in: internIds },
                        discipline: action.discipline,
                        testStatus: {
                            in: [client_1.TestStatus.PickTerm, client_1.TestStatus.Pending],
                        },
                    },
                    data: {
                        testStatus: this.getInitialTestStatus(action.discipline),
                        testSlotId: null,
                    },
                });
            case 'SumTestPoints':
                const disciplinesWithResults = await this.prisma.internDiscipline.findMany({
                    where: {
                        internId: { in: internIds },
                        discipline: action.discipline,
                    },
                    include: {
                        internQuestionAnswers: {
                            select: {
                                score: true,
                            },
                        },
                    },
                });
                const updatedDisciplines = disciplinesWithResults.map((d) => ({
                    internId: d.internId,
                    discipline: d.discipline,
                    score: d.internQuestionAnswers.reduce((acc, curr) => acc + curr.score, 0),
                }));
                return await this.prisma.$transaction(updatedDisciplines.map((d) => this.prisma.internDiscipline.update({
                    where: {
                        internId_discipline: {
                            discipline: d.discipline,
                            internId: d.internId,
                        },
                    },
                    data: {
                        testScore: d.score,
                    },
                })));
            default:
                throw new common_1.BadRequestException();
        }
    }
    async setDecision(internId, data) {
        return await this.prisma.$transaction(data.disciplines.map((d) => this.prisma.internDiscipline.update({
            where: {
                internId_discipline: {
                    internId,
                    discipline: d.discipline,
                },
            },
            data: {
                status: d.status,
            },
        })));
    }
    async createNote(internId, data) {
        const { notes: currentNotes } = await this.prisma.intern.findUnique({
            where: { id: internId },
            select: { notes: true },
        });
        return await this.prisma.intern.update({
            where: {
                id: internId,
            },
            data: {
                notes: {
                    set: currentNotes + `${data.note}\n`,
                },
            },
        });
    }
    async count() {
        return await this.prisma.intern.count();
    }
    getInitialTestStatus(discipline) {
        return [client_1.Discipline.Development].includes(discipline)
            ? client_1.TestStatus.PickTerm
            : null;
    }
};
exports.InternService = InternService;
exports.InternService = InternService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InternService);
//# sourceMappingURL=intern.service.js.map