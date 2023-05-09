import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  img?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  tel?: string;
}
