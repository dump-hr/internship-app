import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

import { AzureADStrategy } from './azure.strategy';

@Module({
  imports: [
    PassportModule,
    /* JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '14d' },
    }), */
  ],
  providers: [PrismaService, AzureADStrategy /*, JwtStrategy, AuthService */],
  /*  exports: [AuthService], */
  /* controllers: [AuthController], */
})
export class AuthModule {}
