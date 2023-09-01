import {ApiProperty} from '@nestjs/swagger'
import { Field, Prisma } from '@prisma/client'
import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateInternDto {

  @IsString()
  @MinLength(1)
  @ApiProperty()
  firstName: string

  @IsString()
  @MinLength(1)
  @ApiProperty()
  lastName: string

  @IsString()
  @IsEmail()
  @ApiProperty()
  email: string

  @ApiProperty()
  fields: Field[]

  @ApiProperty()
  data: Prisma.JsonObject
}