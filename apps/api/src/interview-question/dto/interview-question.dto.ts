import {
  InterviewQuestionCategory,
  InterviewQuestionType,
} from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsJSON,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class InterviewQuestionDetailsDto {
  @IsOptional()
  @IsJSON()
  options?: any;

  @IsOptional()
  @IsInt()
  @Min(0)
  min?: number;

  @IsOptional()
  @IsInt()
  @Max(100)
  max?: number;

  @IsOptional()
  @IsInt()
  step?: number;
}

export class InterviewQuestionDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsString()
  question: string;

  @IsEnum(InterviewQuestionType)
  type: InterviewQuestionType;

  @IsEnum(InterviewQuestionCategory)
  category: InterviewQuestionCategory;

  @IsOptional()
  details?: InterviewQuestionDetailsDto;
}
