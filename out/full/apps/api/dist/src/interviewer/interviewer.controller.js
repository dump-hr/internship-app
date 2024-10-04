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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewerController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const logger_service_1 = require("../logger/logger.service");
const createInterviewer_dto_1 = require("./dto/createInterviewer.dto");
const interviewer_service_1 = require("./interviewer.service");
const admin_guard_1 = require("../auth/admin.guard");
let InterviewerController = class InterviewerController {
    constructor(interviewerService, loggerService) {
        this.interviewerService = interviewerService;
        this.loggerService = loggerService;
    }
    async getAll() {
        const interviewers = await this.interviewerService.getAll();
        return interviewers;
    }
    async create(interviewer) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Create, `Kreiranje intervjuista ${interviewer.email}`);
        const newInterviewer = await this.interviewerService.create(interviewer);
        return newInterviewer;
    }
    async delete(id) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Delete, `Brisanje intervjuista ${id}`);
        const deletedInterviewer = await this.interviewerService.delete(id);
        return deletedInterviewer;
    }
    async getInterviewersParticipations() {
        return await this.interviewerService.getInterviewersParticipations();
    }
};
exports.InterviewerController = InterviewerController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterviewerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createInterviewer_dto_1.CreateInterviewerDto]),
    __metadata("design:returntype", Promise)
], InterviewerController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InterviewerController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('participations'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterviewerController.prototype, "getInterviewersParticipations", null);
exports.InterviewerController = InterviewerController = __decorate([
    (0, common_1.Controller)('interviewer'),
    (0, swagger_1.ApiTags)('interviewer'),
    __metadata("design:paramtypes", [interviewer_service_1.InterviewerService,
        logger_service_1.LoggerService])
], InterviewerController);
//# sourceMappingURL=interviewer.controller.js.map