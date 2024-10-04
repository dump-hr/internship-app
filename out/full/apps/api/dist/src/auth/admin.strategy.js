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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureADStrategy = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const jwksRsa = require("jwks-rsa");
const passport_jwt_1 = require("passport-jwt");
const auth_consts_1 = require("./auth.consts");
let AzureADStrategy = class AzureADStrategy extends (0, passport_1.PassportStrategy)(passport_jwt_1.Strategy, 'AzureAD') {
    constructor() {
        super({
            jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
            algorithms: ['RS256'],
            secretOrKeyProvider: jwksRsa.passportJwtSecret({
                rateLimit: true,
                jwksUri: auth_consts_1.jwksUrl,
            }),
        });
    }
    async validate(payload) {
        return {
            sub: payload.sub,
            name: payload.name,
            email: payload.email,
            roles: payload.roles,
        };
    }
};
exports.AzureADStrategy = AzureADStrategy;
exports.AzureADStrategy = AzureADStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AzureADStrategy);
//# sourceMappingURL=admin.strategy.js.map