"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const email_module_1 = require("./email/email.module");
const intern_module_1 = require("./intern/intern.module");
const interview_slot_module_1 = require("./interview-slot/interview-slot.module");
const interviewer_module_1 = require("./interviewer/interviewer.module");
const logger_module_1 = require("./logger/logger.module");
const prisma_service_1 = require("./prisma.service");
const test_slot_module_1 = require("./test-slot/test-slot.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', '..', 'web', 'dist'),
                exclude: ['/api/(.*)'],
            }),
            logger_module_1.LoggerModule,
            intern_module_1.InternModule,
            email_module_1.EmailModule,
            auth_module_1.AuthModule,
            interview_slot_module_1.InterviewSlotModule,
            interviewer_module_1.InterviewerModule,
            test_slot_module_1.TestSlotModule,
            interviewer_module_1.InterviewerModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map