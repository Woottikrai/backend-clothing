import { ApiProperty } from '@nestjs/swagger';

export class CreateSizeDto {
  @ApiProperty()
  size_name: string;
}
export class UpdateSizeDto {
  @ApiProperty()
  size_name?: string;
}
