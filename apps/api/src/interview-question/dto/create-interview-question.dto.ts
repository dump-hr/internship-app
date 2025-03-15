import { ApiProperty } from '@nestjs/swagger';
import { QuestionCategory, QuestionType } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateInterviewQuestionDto {
  @ApiProperty({ description: 'Title of the interview question' })
  @IsString()
  title: string;

  @ApiProperty({ enum: QuestionType, description: 'Type of the question' })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({
    enum: QuestionCategory,
    description: 'Category of the question',
  })
  @IsEnum(QuestionCategory)
  category: QuestionCategory;

  @ApiProperty({
    required: false,
    description: 'Minimum value for slider questions',
  })
  @IsOptional()
  @IsInt()
  min?: number;

  @ApiProperty({
    required: false,
    description: 'Maximum value for slider questions',
  })
  @IsOptional()
  @IsInt()
  max?: number;

  @ApiProperty({
    required: false,
    description: 'Step value for slider questions',
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  step?: number;

  @ApiProperty({
    required: false,
    description: 'Options for select type questions',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  options?: string[];

  @ApiProperty({
    required: false,
    description: 'Whether the question is active',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
