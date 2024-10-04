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
exports.EmailService = void 0;
const common_1 = require("@nestjs/common");
const nunjucks = require("nunjucks");
const postmark = require("postmark");
const prisma_service_1 = require("../prisma.service");
let EmailService = class EmailService {
    constructor(prisma) {
        this.prisma = prisma;
        this.postmark = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);
    }
    async sendEmail(emails, text, subject) {
        const interns = await this.prisma.intern.findMany({
            where: { email: { in: emails } },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                interviewStatus: true,
                internDisciplines: {
                    select: {
                        discipline: true,
                        priority: true,
                        status: true,
                    },
                },
                interviewSlot: {
                    select: {
                        start: true,
                        end: true,
                        score: true,
                    },
                },
            },
        });
        const template = nunjucks.compile(text);
        return Promise.all(interns.map((intern) => {
            return this.postmark.sendEmail({
                From: 'info@dump.hr',
                To: intern.email,
                Subject: subject,
                TextBody: template.render({ intern }),
                MessageStream: 'outbound',
            });
        }));
    }
    async makeEmail(emails, text) {
        const interns = await this.prisma.intern.findMany({
            where: { email: { in: emails } },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                interviewStatus: true,
                internDisciplines: {
                    select: {
                        discipline: true,
                        priority: true,
                        status: true,
                    },
                },
                interviewSlot: {
                    select: {
                        start: true,
                        end: true,
                        score: true,
                    },
                },
            },
        });
        const template = nunjucks.compile(text);
        return interns.map((intern) => template.render({ intern }));
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], EmailService);
//# sourceMappingURL=email.service.js.map