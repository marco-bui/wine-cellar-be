import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class GetListCategoriesDto {
  @ApiProperty({ required: false, type: 'number', default: 10 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  limit?: number;

  @ApiProperty({ required: false, type: 'number', default: 0 })
  @IsNumber()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  offset?: number;
}
