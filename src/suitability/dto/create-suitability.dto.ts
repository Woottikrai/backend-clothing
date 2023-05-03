import { ApiProperty } from '@nestjs/swagger';

export class CreateSuitabilityDto {
  @ApiProperty()
  suitability_name: string;
}
export class UpdateSuitabilityDto {
  @ApiProperty()
  suitability_name?: string;
}
