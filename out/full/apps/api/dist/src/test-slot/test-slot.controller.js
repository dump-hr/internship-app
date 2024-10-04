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
exports.TestSlotController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const logger_service_1 = require("../logger/logger.service");
const test_slot_service_1 = require("./test-slot.service");
const admin_guard_1 = require("../auth/admin.guard");
let TestSlotController = class TestSlotController {
    constructor(testSlotService, loggerService) {
        this.testSlotService = testSlotService;
        this.loggerService = loggerService;
    }
    async getAll() {
        const allSlots = await this.testSlotService.getAll();
        const testSlotsDto = allSlots.map((ts) => (Object.assign(Object.assign({}, ts), { discipline: ts.discipline, internCount: ts._count.internDisciplines, questionCount: ts._count.testQuestions })));
        return testSlotsDto;
    }
    async get(id) {
        return await this.testSlotService.get(id);
    }
    async createTestSlot(testSlotDto) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Create, `Kreiranje ${testSlotDto.length} testova`);
        return await this.testSlotService.create(testSlotDto);
    }
    async updateTestSlot(testSlotId, { data }) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Update, `Updateanje testa ${testSlotId}`);
        return await this.testSlotService.update(testSlotId, data);
    }
    async delete(id) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Delete, `Brisanje testa ${id}`);
        return await this.testSlotService.delete(id);
    }
    async getAvailableSlots(internId, discipline) {
        await this.loggerService.createInternLog(internId, client_1.InternLogAction.OpenTestPage);
        return await this.testSlotService.getAvailableSlots(internId, discipline);
    }
    async scheduleTest(slotId, { internId }) {
        return await this.testSlotService.scheduleTest(slotId, internId);
    }
    async chooseTest({ password }) {
        return await this.testSlotService.chooseTest(password);
    }
    async startTest(testSlotId, { internEmail, password }) {
        return await this.testSlotService.startTest(testSlotId, internEmail, password);
    }
    async submitTest(testSlotId, req) {
        return await this.testSlotService.submitTest(testSlotId, req);
    }
    async getTestAnswersByIntern(testSlotId, internId) {
        return await this.testSlotService.getTestAnswersByIntern(testSlotId, internId);
    }
    async getTestAnswersByQuestion(questionId) {
        return await this.testSlotService.getTestAnswersByQuestion(questionId);
    }
    async setScore(answerId, { score }) {
        return await this.testSlotService.setScore(answerId, +score);
    }
};
exports.TestSlotController = TestSlotController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "createTestSlot", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "updateTestSlot", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "delete", null);
__decorate([
    (0, common_1.Get)('available/:discipline/:internId'),
    __param(0, (0, common_1.Param)('internId')),
    __param(1, (0, common_1.Param)('discipline')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "getAvailableSlots", null);
__decorate([
    (0, common_1.Patch)('schedule/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "scheduleTest", null);
__decorate([
    (0, common_1.Post)('choose'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "chooseTest", null);
__decorate([
    (0, common_1.Post)('start/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "startTest", null);
__decorate([
    (0, common_1.Post)('submit/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "submitTest", null);
__decorate([
    (0, common_1.Get)('answers/:testSlotId/intern/:internId'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('testSlotId')),
    __param(1, (0, common_1.Param)('internId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "getTestAnswersByIntern", null);
__decorate([
    (0, common_1.Get)('answers/:testSlotId/question/:questionId'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "getTestAnswersByQuestion", null);
__decorate([
    (0, common_1.Put)('score/:answerId'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('answerId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TestSlotController.prototype, "setScore", null);
exports.TestSlotController = TestSlotController = __decorate([
    (0, common_1.Controller)('test-slot'),
    (0, swagger_1.ApiTags)('test-slot'),
    __metadata("design:paramtypes", [test_slot_service_1.TestSlotService,
        logger_service_1.LoggerService])
], TestSlotController);
//# sourceMappingURL=test-slot.controller.js.map