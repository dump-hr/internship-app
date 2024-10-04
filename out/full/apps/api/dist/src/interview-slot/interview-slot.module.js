"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewSlotModule = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../logger/logger.service");
const prisma_service_1 = require("../prisma.service");
const interview_slot_controller_1 = require("./interview-slot.controller");
const interview_slot_service_1 = require("./interview-slot.service");
let InterviewSlotModule = class InterviewSlotModule {
};
exports.InterviewSlotModule = InterviewSlotModule;
exports.InterviewSlotModule = InterviewSlotModule = __decorate([
    (0, common_1.Module)({
        controllers: [interview_slot_controller_1.InterviewSlotController],
        providers: [interview_slot_service_1.InterviewSlotService, logger_service_1.LoggerService, prisma_service_1.PrismaService],
    })
], InterviewSlotModule);
//# sourceMappingURL=interview-slot.module.js.map