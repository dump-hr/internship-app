import {
  ExecutionContext,
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

const AzureADGuard = (role: Role) =>
  class extends AuthGuard('AzureAD') {
    canActivate(context: ExecutionContext) {
      return super.canActivate(context);
    }

    handleRequest(err, user) {
      const roles = supportedRolesPerRole[role];

      if (err || !user?.roles) {
        throw err || new UnauthorizedException();
      }

      return user;
    }
  };

@Injectable()
export class AdminGuard extends AzureADGuard(Role.Admin) {}

@Injectable()
export class MemberGuard extends AzureADGuard(Role.Member) {}
