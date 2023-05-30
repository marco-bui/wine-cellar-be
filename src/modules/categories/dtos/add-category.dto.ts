import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class AddCategoryDto {
  @ApiProperty({ required: true, type: 'string', description: 'Category name' })
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({ required: false, type: 'string', description: 'Image url' })
  @IsOptional()
  image?: string;
}
