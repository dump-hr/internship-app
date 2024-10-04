"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewerModule = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../logger/logger.service");
const prisma_service_1 = require("../prisma.service");
const interviewer_controller_1 = require("./interviewer.controller");
const interviewer_service_1 = require("./interviewer.service");
let InterviewerModule = class InterviewerModule {
};
exports.InterviewerModule = InterviewerModule;
exports.InterviewerModule = InterviewerModule = __decorate([
    (0, common_1.Module)({
        controllers: [interviewer_controller_1.InterviewerController],
        providers: [interviewer_service_1.InterviewerService, logger_service_1.LoggerService, prisma_service_1.PrismaService],
    })
], InterviewerModule);
//# sourceMappingURL=interviewer.module.js.map