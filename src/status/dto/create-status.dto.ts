import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @ApiProperty()
  status_name: string;
}

export class UpdateStatusDto {
  @ApiProperty()
  status_name?: string;
}
