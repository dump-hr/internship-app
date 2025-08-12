import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export enum Role {
  Member = 'Member',
  Admin = 'Admin',
}

const supportedRolesPerRole = {
  [Role.Admin]: [Role.Admin],
  [Role.Member]: [Role.Admin, Role.Member],
};

const areArraysOverlapping = <T>(first: T[], second: T[]) => {
  return first.some((f) => second.includes(f));
};

const AzureADGuard = (role: Role) =>
  class extends AuthGuard('AzureAD') {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }

    handleRequest(err, user) {
      const roles = supportedRolesPerRole[role];

      if (err || !user) {
        throw err || new UnauthorizedException();
      }

      if (!user.roles || !areArraysOverlapping(user.roles, roles)) {
        throw new ForbiddenException(
          'You do not have permission to perform this action.',
        );
      }

      return user;
    }
  };

@Injectable()
export class AdminGuard extends AzureADGuard(Role.Admin) {}

@Injectable()
export class MemberGuard extends AzureADGuard(Role.Member) {}
