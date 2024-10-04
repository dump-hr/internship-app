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
exports.EmailController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const logger_service_1 = require("../logger/logger.service");
const emails_dto_1 = require("./dto/emails.dto");
const emailsSend_dto_1 = require("./dto/emailsSend.dto");
const email_service_1 = require("./email.service");
const admin_guard_1 = require("../auth/admin.guard");
let EmailController = class EmailController {
    constructor(emailService, loggerService) {
        this.emailService = emailService;
        this.loggerService = loggerService;
    }
    async sendEmails({ emails, text, subject }) {
        await this.loggerService.createAdminLog(client_1.AdminLogAction.Email, `Poslan mail ${emails.join(',')} naziva ${subject}`);
        return await this.emailService.sendEmail(emails, text, subject);
    }
    async makeEmails({ emails, text }) {
        const templates = await this.emailService.makeEmail(emails, text);
        return templates;
    }
};
exports.EmailController = EmailController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    (0, common_1.Post)('send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [emailsSend_dto_1.EmailsSendDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "sendEmails", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.MemberGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [emails_dto_1.EmailsDto]),
    __metadata("design:returntype", Promise)
], EmailController.prototype, "makeEmails", null);
exports.EmailController = EmailController = __decorate([
    (0, common_1.Controller)('email'),
    (0, swagger_1.ApiTags)('email'),
    __metadata("design:paramtypes", [email_service_1.EmailService,
        logger_service_1.LoggerService])
], EmailController);
//# sourceMappingURL=email.controller.js.map