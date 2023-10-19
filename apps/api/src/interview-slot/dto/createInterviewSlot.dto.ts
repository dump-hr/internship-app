import { IsArray, IsDateString } from 'class-validator';

export class CreateInterviewSlotDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;

  @IsArray()
  interviewers: string[];
}
