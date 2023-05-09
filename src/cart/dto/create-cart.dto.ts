import { ApiProperty } from '@nestjs/swagger';

export class CreateCartDto {
  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productId: number;

  @ApiProperty()
  statusId: number;

  @ApiProperty()
  userId: number;
}
