import { IsString } from 'class-validator';

export class CreateInterviewMemberParticipationDto {
  @IsString()
  interviewSlotId: string;

  @IsString()
  interviewerId: string;
}
