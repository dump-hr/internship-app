import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Prisma, QuestionCategory, QuestionType } from '@prisma/client';

export class CreateInterviewQuestionDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  title: string;

  @ApiProperty()
  type: QuestionType;

  @ApiProperty()
  category: QuestionCategory;

  @ApiProperty()
  min: number | null;

  @ApiProperty()
  max: number | null;

  @ApiProperty()
  step: number | null;

  @ApiProperty()
  options: Prisma.JsonArray;

  @ApiProperty()
  isEnabled: boolean;
}
