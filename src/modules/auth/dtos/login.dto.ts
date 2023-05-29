import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true, type: 'string', description: 'Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ required: true, type: 'string', description: 'Password' })
  @IsString()
  password: string;
}

export class LoginResponseDto {
  token: string;
}
