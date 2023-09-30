import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

import { InterviewMemberParticipationController } from './interview-member-participation.controller';
import { InterviewMemberParticipationService } from './interview-member-participation.service';

@Module({
  controllers: [InterviewMemberParticipationController],
  providers: [InterviewMemberParticipationService, PrismaService],
})
export class InterviewMemberParticipationModule {}
