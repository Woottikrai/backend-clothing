import { ApiProperty } from '@nestjs/swagger';

export class CreateProducttype {
  @ApiProperty()
  producttype_name: string;
}

export class UpdateProducttype {
  @ApiProperty()
  producttype_name: string;
}
