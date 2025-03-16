import { Intern, InternDiscipline } from '@internship-app/types';
import {
  Discipline,
  InterviewQuestionCategory,
  InterviewQuestionType,
} from '@prisma/client';
import {
  IsBoolean,
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

  @IsEnum(Discipline)
  discipline?: Discipline;

  @IsBoolean()
  isEnabled: boolean;

  @IsOptional()
  details?: InterviewQuestionDetailsDto;
}

export class InterviewQuestionAnswerDto {
  @IsOptional()
  @IsUUID()
  id?: string;

  question: InterviewQuestionDto;

  @IsString()
  questionId: string;

  intern: Intern;

  @IsString()
  internId: string;

  @IsString()
  answer: string;

  @IsBoolean()
  flag: boolean;
}
