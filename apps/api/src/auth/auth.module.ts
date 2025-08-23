import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AzureADStrategy } from './azure.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    /* JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '14d' },
    }), */
  ],
  providers: [JwtStrategy, PrismaService, AuthService, AzureADStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
