import { QuestionCategory, QuestionType } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Validate,
} from 'class-validator';

import { IsMinLessThanMax } from '../../utility/isMinLessThanMax.decorator';

export class CreateInterviewQuestionDto {
  @IsString()
  question: string;

  @Transform(({ value }) => value?.toString())
  @IsEnum(QuestionCategory)
  category: QuestionCategory;

  @Transform(({ value }) => value?.toString())
  @IsEnum(QuestionType)
  type: QuestionType;

  @Validate(IsMinLessThanMax)
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

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  options?: string[] | null;
}
