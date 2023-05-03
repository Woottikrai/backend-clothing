import { ApiProperty } from '@nestjs/swagger';

export class UpdateRole {
  @ApiProperty()
  role_name: string;
}
