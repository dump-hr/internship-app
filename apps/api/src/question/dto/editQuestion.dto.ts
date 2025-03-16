import {
  IsArray,
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class EditQuestionDto {
  id: string;

  @IsString()
  @MinLength(2)
  question: string;

  @IsArray()
  @IsOptional()
  options: string[];

  @IsBoolean()
  isEnabled: boolean;
}
