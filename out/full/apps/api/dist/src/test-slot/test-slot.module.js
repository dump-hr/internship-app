"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestSlotModule = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../logger/logger.service");
const prisma_service_1 = require("../prisma.service");
const test_slot_controller_1 = require("./test-slot.controller");
const test_slot_service_1 = require("./test-slot.service");
let TestSlotModule = class TestSlotModule {
};
exports.TestSlotModule = TestSlotModule;
exports.TestSlotModule = TestSlotModule = __decorate([
    (0, common_1.Module)({
        controllers: [test_slot_controller_1.TestSlotController],
        providers: [test_slot_service_1.TestSlotService, logger_service_1.LoggerService, prisma_service_1.PrismaService],
    })
], TestSlotModule);
//# sourceMappingURL=test-slot.module.js.map