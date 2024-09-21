import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsInt, IsString } from 'class-validator';

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
