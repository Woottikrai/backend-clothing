import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  password?: string;

  @ApiProperty()
  img?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  tel?: string;

  @ApiProperty()
  roleId?: number;

  @ApiProperty()
  cartId?: number;
}
