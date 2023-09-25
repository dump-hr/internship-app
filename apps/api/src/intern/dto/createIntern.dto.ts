import { ApiProperty } from '@nestjs/swagger';
import { Discipline, Prisma } from '@prisma/client';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class CreateInternDto {
  @IsString()
  @MinLength(1)
  @ApiProperty()
  firstName: string;

  @IsString()
  @MinLength(1)
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string;

  @ApiProperty()
  disciplines: Discipline[];

  @ApiProperty()
  data: Prisma.JsonObject;
}
