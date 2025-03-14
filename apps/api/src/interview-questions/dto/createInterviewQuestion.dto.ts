import { QuestionCategory, QuestionType } from '@prisma/client';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateInterviewQuestionDto {
  @IsString()
  question: string;

  @IsEnum(QuestionType)
  category: QuestionCategory;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  minValue?: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  maxValue?: number | null;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  stepValue?: number | null;
}
