import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/entities/role.entity';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  img: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  tel: string;

  @ApiProperty()
  roleId: number;

  @ApiProperty()
  cartId: number;
}
