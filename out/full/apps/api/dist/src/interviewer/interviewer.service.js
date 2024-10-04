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
exports.InterviewerService = void 0;
const common_1 = require("@nestjs/common");
const exceptions_1 = require("@nestjs/common/exceptions");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma.service");
let InterviewerService = class InterviewerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAll() {
        const interviewers = await this.prisma.interviewer.findMany({
            include: {
                interviews: {
                    select: {
                        interviewSlot: {
                            select: {
                                score: true,
                            },
                        },
                    },
                    where: {
                        interviewSlot: {
                            intern: {
                                interviewStatus: client_1.InterviewStatus.Done,
                            },
                        },
                    },
                },
            },
        });
        const interviewersWithStats = interviewers
            .map((interviewer) => (Object.assign(Object.assign({}, interviewer), { interviews: null, _count: { interviews: interviewer.interviews.length }, _avg: {
                score: interviewer.interviews.reduce((acc, curr) => acc + curr.interviewSlot.score, 0) / interviewer.interviews.length,
            } })))
            .sort((a, b) => b._count.interviews - a._count.interviews);
        return interviewersWithStats;
    }
    async create(interviewerToCreate) {
        const interviewerWithTheSameEmail = await this.prisma.interviewer.findFirst({
            where: {
                email: {
                    equals: interviewerToCreate.email,
                    mode: 'insensitive',
                },
            },
        });
        if (interviewerWithTheSameEmail) {
            throw new exceptions_1.BadRequestException('Interviewer with the same email already exists');
        }
        const newInterviewer = await this.prisma.interviewer.create({
            data: interviewerToCreate,
        });
        return newInterviewer;
    }
    async delete(id) {
        const interviewerToDelete = await this.prisma.interviewer.findUnique({
            where: {
                id: id,
            },
        });
        if (!interviewerToDelete) {
            throw new exceptions_1.BadRequestException('Interviewer does not exist');
        }
        const deletedInterviewer = await this.prisma.interviewer.delete({
            where: {
                id,
            },
        });
        return deletedInterviewer;
    }
    async getInterviewersParticipations() {
        return await this.prisma.interviewMemberParticipation.findMany();
    }
};
exports.InterviewerService = InterviewerService;
exports.InterviewerService = InterviewerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InterviewerService);
//# sourceMappingURL=interviewer.service.js.map