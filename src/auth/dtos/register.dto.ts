import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { Gender, Roles } from '../../database/models/users.entity';

export class RegisterDto {
  @ApiProperty({ required: true, type: 'string', description: 'First name' })
  @IsString()
  @Transform(({ value }) => value.trim())
  firstName: string;

  @ApiProperty({ required: true, type: 'string', description: 'First name' })
  @IsString()
  @Transform(({ value }) => value.trim())
  lastName: string;

  @ApiProperty({ required: true, type: 'enum', description: 'Gender' })
  @IsEnum(Gender)
  gender: Gender;

  @ApiProperty({ required: true, type: 'string', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, type: 'string', description: 'Phone number' })
  @IsString()
  phone: string;

  @ApiProperty({ required: true, type: 'string', description: 'Password' })
  @MinLength(6)
  @MaxLength(20)
  password: string;

  @ApiProperty({ required: true, type: 'number', description: 'Age' })
  @IsNumber()
  age: number;

  @ApiProperty({ required: false, type: 'string', description: 'Address' })
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false, type: 'string', description: 'Avatar url' })
  @IsOptional()
  avatar?: string;
}

export class RegisterResponseDto {
  id: string;
  email: string;
  phone: string;
  role: Roles;
  token: string;
}
