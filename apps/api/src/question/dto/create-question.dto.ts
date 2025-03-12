import {
  IsBoolean,
  isBoolean,
  IsEnum,
  IsInt,
  isInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { QuestionType, QuestionCategory } from '@prisma/client';

export class CreateQuestionDto {
  @IsString()
  question: string;

  @IsEnum(QuestionType)
  type: QuestionType;

  @IsEnum(QuestionCategory)
  category: QuestionCategory;

  @IsOptional()
  @IsInt()
  minValue?: number;

  @IsOptional()
  @IsInt()
  maxValue?: number;

  @IsOptional()
  @IsInt()
  stepValue?: number;

  @IsOptional()
  @IsBoolean()
  isEnabled?: boolean;
}
