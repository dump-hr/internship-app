"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternModule = void 0;
const common_1 = require("@nestjs/common");
const logger_service_1 = require("../logger/logger.service");
const prisma_service_1 = require("../prisma.service");
const intern_controller_1 = require("./intern.controller");
const intern_service_1 = require("./intern.service");
let InternModule = class InternModule {
};
exports.InternModule = InternModule;
exports.InternModule = InternModule = __decorate([
    (0, common_1.Module)({
        controllers: [intern_controller_1.InternController],
        providers: [intern_service_1.InternService, logger_service_1.LoggerService, prisma_service_1.PrismaService],
    })
], InternModule);
//# sourceMappingURL=intern.module.js.map