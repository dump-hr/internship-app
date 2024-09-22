import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class TestClusterQuery {
  @IsOptional()
  @IsUUID()
  @ApiProperty({
    required: false,
  })
  testQuestionId?: string;
}

export class CreateTestCaseDto {
  @ApiProperty()
  @IsString({ each: true })
  input: string[];

  @ApiProperty()
  @IsString({ each: true })
  expectedOutput: string[];

  //TODO: maybe add recursive validation, had problems with tha
  //in a similar project so if it does not work immediately I will ignore it
}

export class CreateTestClusterDto {
  @ApiProperty()
  @IsInt()
  maxExecutionTime: number;

  @ApiProperty()
  @IsInt()
  maxMemory: number;

  @ApiProperty()
  @IsInt()
  points: number;

  @ApiProperty()
  @IsBoolean()
  isSample: boolean;

  @ApiProperty()
  @IsArray()
  testCases: CreateTestCaseDto[];

  testQuestionId: string;
}

export class UpdateTestClusterDto extends PartialType(CreateTestClusterDto) {}
