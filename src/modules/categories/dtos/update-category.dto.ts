import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ required: false, type: 'string' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ required: false, type: 'string' })
  @IsString()
  @IsOptional()
  image?: string;
}
