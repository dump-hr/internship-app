import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';

import { AuthService } from './auth.service';
import { MemberGuard } from './admin.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() { email, password }) {
    const accessToken = await this.authService.adminPasswordLogin(
      email,
      password,
    );

    return {
      access_token: accessToken,
    };
  }

  @UseGuards(MemberGuard)
  @Get('whoami')
  whoami(@Req() { user }) {
    return user;
  }
}
