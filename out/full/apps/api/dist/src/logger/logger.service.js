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
exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let LoggerService = class LoggerService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getAdminLogs(req) {
        const filter = Object.assign(Object.assign({}, (req.action && { action: req.action })), (req.description && {
            description: { contains: req.description, mode: 'insensitive' },
        }));
        const count = await this.prisma.adminLog.count({ where: filter });
        const logs = await this.prisma.adminLog.findMany({
            where: filter,
            take: req.take,
            skip: req.skip,
            orderBy: { date: 'desc' },
        });
        return {
            count,
            logs,
        };
    }
    async createInternLog(internId, action) {
        return await this.prisma.internLog.create({
            data: {
                internId,
                action,
            },
        });
    }
    async createAdminLog(action, description) {
        return await this.prisma.adminLog.create({
            data: {
                action,
                description,
            },
        });
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LoggerService);
//# sourceMappingURL=logger.service.js.map