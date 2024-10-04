"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemberGuard = exports.AdminGuard = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const auth_helper_1 = require("./auth.helper");
var Role;
(function (Role) {
    Role["Member"] = "Member";
    Role["Admin"] = "Admin";
})(Role || (Role = {}));
const supportedRolesPerRole = {
    [Role.Admin]: [Role.Admin],
    [Role.Member]: [Role.Admin, Role.Member],
};
const AzureADGuard = (role) => class extends (0, passport_1.AuthGuard)('AzureAD') {
    canActivate(context) {
        return super.canActivate(context);
    }
    handleRequest(err, user) {
        const supportedRoles = supportedRolesPerRole[role];
        console.log(user);
        if (err ||
            !(user === null || user === void 0 ? void 0 : user.roles) ||
            !(0, auth_helper_1.areArraysOverlapping)(user.roles, supportedRoles)) {
            throw err || new common_1.UnauthorizedException();
        }
        return user;
    }
};
let AdminGuard = class AdminGuard extends AzureADGuard(Role.Admin) {
};
exports.AdminGuard = AdminGuard;
exports.AdminGuard = AdminGuard = __decorate([
    (0, common_1.Injectable)()
], AdminGuard);
let MemberGuard = class MemberGuard extends AzureADGuard(Role.Member) {
};
exports.MemberGuard = MemberGuard;
exports.MemberGuard = MemberGuard = __decorate([
    (0, common_1.Injectable)()
], MemberGuard);
//# sourceMappingURL=admin.guard.js.map