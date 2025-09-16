import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { InternController } from './intern.controller';
import { InternService } from './intern.service';

@Module({
  controllers: [InternController],
  providers: [InternService, LoggerService, EmailService, PrismaService],
})
export class InternModule {}
