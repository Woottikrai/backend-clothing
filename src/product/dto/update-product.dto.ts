import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  detail?: string;

  @ApiProperty()
  price?: number;

  @ApiProperty()
  img?: string;

  @ApiProperty()
  sizeId?: number;

  @ApiProperty()
  producttypeId?: number;

  @ApiProperty()
  suitabilityId?: number;

  @ApiProperty()
  colorId?: number;
}
