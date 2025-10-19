import { Module } from '@nestjs/common';
import { EmailModule } from 'src/email/email.module';
import { LoggerService } from 'src/logger/logger.service';
import { PrismaService } from 'src/prisma.service';

import { InternController } from './intern.controller';
import { InternService } from './intern.service';
import { MicrosoftGraphService } from 'src/interview-slot/graph.service';

@Module({
  controllers: [InternController],
  imports: [EmailModule],
  providers: [
    InternService,
    LoggerService,
    MicrosoftGraphService,
    PrismaService,
  ],
})
export class InternModule {}
