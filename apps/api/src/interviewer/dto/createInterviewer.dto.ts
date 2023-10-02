import { ApiProperty } from '@nestjs/swagger';
import { Discipline } from '@prisma/client';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateInterviewerDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @ApiProperty()
  disciplines: Discipline[];

  @IsEmail()
  @ApiProperty()
  email: string;
}
