import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AzureADStrategy } from './admin.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '14d' },
    }),
  ],
  providers: [AzureADStrategy, JwtStrategy, PrismaService, AuthService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
