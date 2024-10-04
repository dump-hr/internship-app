import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

import { AzureADStrategy } from './admin.strategy';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [PassportModule],
  providers: [AzureADStrategy, PrismaService, AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
