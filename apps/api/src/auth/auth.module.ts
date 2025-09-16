import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';

import { AzureADStrategy } from './azure.strategy';

@Module({
  imports: [PassportModule],
  providers: [PrismaService, AzureADStrategy],
})
export class AuthModule {}
