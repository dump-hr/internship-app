import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Role } from '@internship-app/types';

import { areArraysOverlapping } from './auth.helper';

const supportedRolesPerRole = {
  [Role.Admin]: [Role.Admin],
  [Role.Member]: [Role.Admin, Role.Member],
};

const AzureADGuard = (role: Role) =>
  class extends AuthGuard('AzureAD') {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }

    handleRequest(err, user) {
      const supportedRoles = supportedRolesPerRole[role];

      if (
        err ||
        !user?.roles ||
        !areArraysOverlapping(user.roles, supportedRoles)
      ) {
        throw err || new UnauthorizedException();
      }

      return user;
    }
  };

@Injectable()
export class AdminGuard extends AzureADGuard(Role.Admin) {}

@Injectable()
export class MemberGuard extends AzureADGuard(Role.Member) {}
