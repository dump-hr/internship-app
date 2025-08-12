import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { AdminGuard } from './azure.guard';
import { JwtAuthGuard } from './jwt-auth-guard';

@Injectable()
export class JwtOrAdminGuard implements CanActivate {
  constructor(private jwtGuard: JwtAuthGuard, private adminGuard: AdminGuard) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      if (await this.jwtGuard.canActivate(context)) return true;
    } catch {}
    try {
      if (await this.adminGuard.canActivate(context)) return;
    } catch {}

    return false;
  }
}
