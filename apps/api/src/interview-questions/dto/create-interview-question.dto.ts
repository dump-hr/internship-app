import {
  IsString,
  IsEnum,
  IsOptional,
  IsInt,
  Min,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { QuestionType, QuestionCategory } from '@prisma/client';

export class CreateInterviewQuestionDto {
  @ApiProperty({ description: 'Question title' })
  @IsString()
  title: string;

  @ApiProperty({
    description: 'Question type',
    enum: QuestionType,
    example: QuestionType.Field,
  })
  @IsEnum(QuestionType)
  type: QuestionType;

  @ApiProperty({
    description: 'Question category',
    enum: QuestionCategory,
    example: QuestionCategory.General,
  })
  @IsEnum(QuestionCategory)
  category: QuestionCategory;

  @ApiPropertyOptional({
    description: 'Minimum value for slider questions',
    type: Number,
  })
  @IsOptional()
  @IsInt()
  min?: number;

  @ApiPropertyOptional({
    description: 'Maximum value for slider questions',
    type: Number,
  })
  @IsOptional()
  @IsInt()
  max?: number;

  @ApiPropertyOptional({
    description: 'Step value for slider questions',
    type: Number,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  step?: number;

  @ApiPropertyOptional({
    description: 'Options for select questions',
    type: [String],
    default: [],
  })
  @IsOptional()
  @IsArray()
  options?: string[];

  @ApiPropertyOptional({
    description: 'Whether the question is active',
    default: true,
  })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
