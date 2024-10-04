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
exports.InterviewSlotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const logger_service_1 = require("../logger/logger.service");
const createInterviewSlot_dto_1 = require("./dto/createInterviewSlot.dto");
const interview_slot_service_1 = require("./interview-slot.service");
const admin_guard_1 = require("../auth/admin.guard");
let InterviewSlotController = class InterviewSlotController {
    constructor(interviewSlotService, loggerService) {
        this.interviewSlotService = interviewSlotService;
        this.loggerService = loggerService;
    }
    async getAll() {
        return await this.interviewSlotService.getAll();
    }
    async deleteInterviewSlot(id) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Delete, `Brisanje interview slota ${id}`);
        return await this.interviewSlotService.deleteInterviewSlot(id);
    }
    async createInterviewSlot(interviewSlotDto) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Create, `Kreiranje interview slota u ${interviewSlotDto.start}`);
        return await this.interviewSlotService.createInterviewSlot(interviewSlotDto);
    }
    async getAvailableSlots(internId) {
        await this.loggerService.createInternLog(internId, client_1.InternLogAction.OpenInterviewPage);
        return await this.interviewSlotService.getAvailableSlots(internId);
    }
    async getAvailableSlotsByDisciplines() {
        return await this.interviewSlotService.getAvailableSlotsByDisciplines();
    }
    async scheduleInterview(slotId, { internId }) {
        return await this.interviewSlotService.scheduleInterview(slotId, internId);
    }
};
exports.InterviewSlotController = InterviewSlotController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterviewSlotController.prototype, "getAll", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InterviewSlotController.prototype, "deleteInterviewSlot", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createInterviewSlot_dto_1.CreateInterviewSlotDto]),
    __metadata("design:returntype", Promise)
], InterviewSlotController.prototype, "createInterviewSlot", null);
__decorate([
    (0, common_1.Get)('available/:internId'),
    __param(0, (0, common_1.Param)('internId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InterviewSlotController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Get)('availability'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterviewSlotController.prototype, "getAvailableSlotsByDisciplines", null);
__decorate([
    (0, common_1.Patch)('schedule/:slotId'),
    __param(0, (0, common_1.Param)('slotId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InterviewSlotController.prototype, "scheduleInterview", null);
exports.InterviewSlotController = InterviewSlotController = __decorate([
    (0, common_1.Controller)('interview-slot'),
    (0, swagger_1.ApiTags)('interview-slot'),
    __metadata("design:paramtypes", [interview_slot_service_1.InterviewSlotService,
        logger_service_1.LoggerService])
], InterviewSlotController);
//# sourceMappingURL=interview-slot.controller.js.map