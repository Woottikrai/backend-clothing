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
  @ApiProperty({ nullable: false })
  quantity?: number;

  @ApiProperty({ nullable: false })
  sumPrice?: number;

  @ApiProperty({ nullable: false })
  productId?: number;

  @ApiProperty({ nullable: false })
  orderId?: string;
}
