import { ApiProperty } from '@nestjs/swagger';

export class CreateStockDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: number;
}

export class UpdateStockDto {
  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  productId?: number;
}
