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
  Max,
  Min,
} from 'class-validator';

export class CreateInterviewQuestionDetailsDto {
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

export class CreateInterviewQuestionDto {
  @IsString()
  question: string;

  @IsEnum(InterviewQuestionType)
  type: InterviewQuestionType;

  @IsEnum(InterviewQuestionCategory)
  category: InterviewQuestionCategory;

  @IsOptional()
  details?: CreateInterviewQuestionDetailsDto;
}
