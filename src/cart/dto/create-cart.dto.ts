import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty({ nullable: true })
  quantity: number;

  @ApiProperty({ nullable: true })
  sumPrice: number;

  @ApiProperty({ nullable: true })
  img: string;

  @ApiProperty({ nullable: true })
  productId: number;

  @ApiProperty({ nullable: true })
  userId: number;
}

export class UpdateCaetDto {
  @ApiProperty({ nullable: true })
  quantity?: number;

  @ApiProperty({ nullable: true })
  sumPrice?: number;

  @ApiProperty({ nullable: true })
  productId?: number;

  @ApiProperty({ nullable: true })
  orderId?: string;
}
