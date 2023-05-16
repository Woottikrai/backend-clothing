import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CommonFilter } from 'src/shared/common-filter';

export class FilterQueryProduct extends CommonFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  producttype: string;

  @ApiProperty({ required: false })
  @IsOptional()
  suitability: number;

  @ApiProperty({ required: false })
  @IsOptional()
  color: number;
}
