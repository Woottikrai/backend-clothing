import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  sumPrice: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  userId: number;
}

export class UpdateCaetDto {
  @ApiProperty()
  quantity?: number;

  @ApiProperty()
  sumPrice?: number;

  @ApiProperty()
  productId?: number;
}
