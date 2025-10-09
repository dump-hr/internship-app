import { Module } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { InternController } from './intern.controller';
import { InternService } from './intern.service';
import { EmailModule } from 'src/email/email.module';

@Module({
  controllers: [InternController],
  providers: [InternService, LoggerService, PrismaService],
  imports: [EmailModule],
})
export class InternModule {}
