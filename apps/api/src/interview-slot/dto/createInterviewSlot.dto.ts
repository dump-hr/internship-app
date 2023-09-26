import { IsArray, IsDateString, IsString } from 'class-validator';

export class CreateInterviewSlotDto {
  @IsDateString()
  start: string;

  @IsDateString()
  end: string;

  @IsArray()
  interviewers: string[];

  @IsString()
  notes?: string;
}
