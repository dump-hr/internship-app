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
exports.InterviewSlotService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const postmark = require("postmark");
const prisma_service_1 = require("../prisma.service");
let InterviewSlotService = class InterviewSlotService {
    constructor(prisma) {
        this.prisma = prisma;
        this.postmark = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
    }
    async getAll() {
        const interviewSlots = await this.prisma.interviewSlot.findMany({
            include: {
                intern: true,
                interviewers: {
                    include: {
                        interviewer: true,
                        interviewSlot: true,
                    },
                },
            },
        });
        return interviewSlots;
    }
    async deleteInterviewSlot(id) {
        const interviewToDelete = await this.prisma.interviewSlot.findUnique({
            where: { id },
            include: {
                intern: true,
            },
        });
        if (interviewToDelete.intern) {
            throw new common_1.BadRequestException('Interview is already scheduled! Cancel the interview first!');
        }
        return await this.prisma.interviewSlot.delete({
            where: { id: interviewToDelete.id },
        });
    }
    async createInterviewSlot(interviewSlotDto) {
        const { start, end } = interviewSlotDto;
        const interviewSlots = [];
        const slotDuration = 20 * 60 * 1000;
        try {
            await this.prisma.$transaction(async (prisma) => {
                for (let currentTime = new Date(start).getTime(); currentTime < new Date(end).getTime(); currentTime += slotDuration) {
                    const slotStart = new Date(currentTime);
                    const slotEnd = new Date(currentTime + slotDuration);
                    const interviewSlot = await prisma.interviewSlot.create({
                        data: {
                            start: slotStart,
                            end: slotEnd,
                            answers: {},
                        },
                    });
                    interviewSlots.push(interviewSlot);
                    for (const interviewerId of interviewSlotDto.interviewers) {
                        await prisma.interviewMemberParticipation.create({
                            data: {
                                interviewSlotId: interviewSlot.id,
                                interviewerId: interviewerId,
                            },
                        });
                    }
                }
            });
            return interviewSlots;
        }
        catch (err) {
            console.error(err);
            throw new common_1.InternalServerErrorException(err.message);
        }
    }
    async getAvailableSlots(internId) {
        const intern = await this.prisma.intern.findUnique({
            where: { id: internId },
            include: {
                internDisciplines: {
                    orderBy: {
                        priority: 'asc',
                    },
                },
                interviewSlot: true,
            },
        });
        if (!intern) {
            throw new common_1.NotFoundException('Intern not found');
        }
        if (intern.interviewSlot) {
            throw new common_1.BadRequestException('Interview already scheduled');
        }
        if (intern.interviewStatus !== client_1.InterviewStatus.PickTerm) {
            throw new common_1.BadRequestException('Intern does not have the right to schedule interview');
        }
        const [primaryDiscipline, ...otherDisciplines] = intern.internDisciplines.filter((ind) => ind.status === 'Pending');
        const availableSlots = await this.prisma.interviewSlot.findMany({
            where: {
                internId: null,
                start: {
                    gte: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
                },
                AND: [
                    {
                        interviewers: {
                            some: {
                                interviewer: {
                                    disciplines: {
                                        has: primaryDiscipline.discipline,
                                    },
                                },
                            },
                        },
                    },
                    otherDisciplines.length > 0
                        ? {
                            interviewers: {
                                some: {
                                    interviewer: {
                                        disciplines: {
                                            hasSome: otherDisciplines.map((d) => d.discipline),
                                        },
                                    },
                                },
                            },
                        }
                        : {},
                ],
            },
            orderBy: {
                start: 'asc',
            },
        });
        return availableSlots;
    }
    async getAvailableSlotsByDisciplines() {
        const disciplineCombinations = await this.prisma.$queryRaw(client_1.Prisma.sql `
        select disciplines, count(*)::integer as needed from 
        (
          select DISTINCT array_agg("InternDiscipline".discipline ORDER BY "priority" ASC) as "disciplines", "Intern".id 
          from "Intern" 
		      left join "InternDiscipline" on "InternDiscipline"."internId" = "Intern".id 
          where "Intern"."interviewStatus" = 'PickTerm'
		      group by "Intern".id
        ) as disciplineCombinations
        group by disciplines
        order by needed desc
      `);
        const interviewSlots = await Promise.all(disciplineCombinations.map(async (dc) => {
            const [primary, ...other] = dc.disciplines;
            const available = await this.prisma.interviewSlot.count({
                where: {
                    internId: null,
                    start: {
                        gte: new Date(new Date().getTime() + 4 * 60 * 60 * 1000),
                    },
                    AND: [
                        {
                            interviewers: {
                                some: {
                                    interviewer: {
                                        disciplines: {
                                            has: primary,
                                        },
                                    },
                                },
                            },
                        },
                        other.length > 0
                            ? {
                                interviewers: {
                                    some: {
                                        interviewer: {
                                            disciplines: {
                                                hasSome: other,
                                            },
                                        },
                                    },
                                },
                            }
                            : {},
                    ],
                },
            });
            return Object.assign(Object.assign({}, dc), { available });
        }));
        return interviewSlots;
    }
    async scheduleInterview(slotId, internId) {
        const slot = await this.prisma.interviewSlot.findUnique({
            where: { id: slotId },
        });
        if (slot.internId) {
            throw new common_1.NotFoundException('Slot is already taken');
        }
        if (new Date(new Date().getTime() + 4 * 60 * 60 * 1000 - 60 * 1000) >
            slot.start)
            throw new common_1.NotFoundException('Too late to schedule slot');
        const internSlot = await this.prisma.interviewSlot.findFirst({
            where: { internId },
        });
        if (internSlot) {
            throw new common_1.NotFoundException('Intern already has a slot');
        }
        const intern = await this.prisma.intern.findUnique({
            where: { id: internId },
        });
        this.postmark.sendEmail({
            From: 'info@dump.hr',
            To: intern.email,
            Subject: 'Uspješno biranje termina za DUMP Internship intervju',
            TextBody: `Pozdrav ${intern.firstName},

biranje termina intervjua je uspješno provedeno! Termin svog intervjua možeš vidjeti na status stranici: https://internship.dump.hr/status/${intern.id}
U slučaju da ipak ne možeš doći na odabrani termin, javi nam se na vrijeme na info@dump.hr

Podsjećamo, tvoj intervju će se održati u odabranom terminu u našem uredu (prostorija A223) na FESB-u (Ruđera Boškovića 32).

Naš ured ćeš pronaći tako da kad uđeš kroz glavna vrata FESB-a skreneš desno do kraja hodnika (put referade) dok ne dođeš do stepenica koje su s lijeve strane. Popneš se stepenicama na prvi kat i skreneš lijevo. Nastaviš hodnikom do kraja i s desne strane vidjet ćeš vrata našeg ureda (A223).

Vidimo se!

DUMP Udruga mladih programera
dump.hr`,
            MessageStream: 'outbound',
        });
        return await this.prisma.intern.update({
            where: { id: internId, interviewStatus: client_1.InterviewStatus.PickTerm },
            data: {
                interviewStatus: client_1.InterviewStatus.Pending,
                interviewSlot: {
                    connect: {
                        id: slotId,
                    },
                },
            },
        });
    }
};
exports.InterviewSlotService = InterviewSlotService;
exports.InterviewSlotService = InterviewSlotService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InterviewSlotService);
//# sourceMappingURL=interview-slot.service.js.map