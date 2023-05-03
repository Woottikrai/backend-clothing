import { ApiProperty } from '@nestjs/swagger';

export class CreateColorDto {
  @ApiProperty()
  color_name: string;
}

export class UpdateColorDto {
  @ApiProperty()
  color_name?: string;
}
