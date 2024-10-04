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
exports.InternController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const logger_service_1 = require("../logger/logger.service");
const createIntern_dto_1 = require("./dto/createIntern.dto");
const intern_service_1 = require("./intern.service");
const admin_guard_1 = require("../auth/admin.guard");
let InternController = class InternController {
    constructor(internService, loggerService) {
        this.internService = internService;
        this.loggerService = loggerService;
    }
    async getAll() {
        const interns = await this.internService.getAll();
        return interns;
    }
    async count() {
        return await this.internService.count();
    }
    async get(id) {
        const intern = await this.internService.get(id);
        if (!intern) {
            throw new common_1.NotFoundException();
        }
        return intern;
    }
    async getApplicationStatus(id) {
        await this.loggerService.createInternLog(id, client_1.InternLogAction.OpenStatusPage);
        const status = await this.internService.getApplicationStatus(id);
        if (!status) {
            throw new common_1.NotFoundException();
        }
        return status;
    }
    async create(intern) {
        const newIntern = await this.internService.create(intern);
        return newIntern;
    }
    async setInterview(internId, data) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Update, `Intervjuiranje ${internId}`);
        return await this.internService.setInterview(internId, data);
    }
    async setImage(internId, file) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Update, `Stavljanje slike ${internId}`);
        return await this.internService.setImage(internId, file.buffer);
    }
    async applyAction(internId, { action }) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Update, `Akcija nad pripravnikom ${internId} : ${JSON.stringify(action)}`);
        return await this.internService.applyAction(internId, action);
    }
    async applyBoardAction({ action, internIds }) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Update, `Bulk update nad ${JSON.stringify(internIds)} : ${JSON.stringify(action)}`);
        return await this.internService.applyBoardAction(action, internIds);
    }
    async setDecision(internId, data) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Update, `Odluka o članstvu nad ${internId}`);
        return await this.internService.setDecision(internId, data);
    }
    async setNote(internId, data) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Create, `Dodana nota nad ${internId}`);
        return await this.internService.createNote(internId, data);
    }
};
exports.InternController = InternController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InternController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)('count'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InternController.prototype, "count", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "get", null);
__decorate([
    (0, common_1.Get)('status/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "getApplicationStatus", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createIntern_dto_1.CreateInternDto]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('setInterview/:internId'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('internId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "setInterview", null);
__decorate([
    (0, common_1.Put)('setImage/:internId'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    __param(0, (0, common_1.Param)('internId')),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        validators: [
            new common_1.FileTypeValidator({ fileType: 'image/png' }),
            new common_1.MaxFileSizeValidator({ maxSize: 1000 * 1000 * 10 }),
        ],
    }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "setImage", null);
__decorate([
    (0, common_1.Put)('action/:internId'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('internId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "applyAction", null);
__decorate([
    (0, common_1.Put)('boardAction'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "applyBoardAction", null);
__decorate([
    (0, common_1.Put)('setDecision/:internId'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('internId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "setDecision", null);
__decorate([
    (0, common_1.Post)('note/:internId'),
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    __param(0, (0, common_1.Param)('internId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InternController.prototype, "setNote", null);
exports.InternController = InternController = __decorate([
    (0, common_1.Controller)('intern'),
    (0, swagger_1.ApiTags)('intern'),
    __metadata("design:paramtypes", [intern_service_1.InternService,
        logger_service_1.LoggerService])
], InternController);
//# sourceMappingURL=intern.controller.js.map