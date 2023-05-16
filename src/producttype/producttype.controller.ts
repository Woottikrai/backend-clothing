import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProducttypeService } from './producttype.service';
import {
  CreateProducttype,
  UpdateProducttype,
} from './dto/create-producttype.dto';

@ApiTags('product-type')
@Controller('product-type')
export class ProductTypeController {
  constructor(private readonly producttypeService: ProducttypeService) {}

  @Post('producttype')
  async createProducttype(@Body() body: CreateProducttype) {
    try {
      return await this.producttypeService.createProducttype(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all')
  async getProducttypeAll() {
    try {
      return await this.producttypeService.getProducttype();
    } catch (error) {
      throw error;
    }
  }

  @Get('get-one/:id')
  async getproducttypeOne(@Param('id', ParseArrayPipe) id: number) {
    try {
      return await this.producttypeService.getProducttypeOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update-product-typeOne/:id')
  async updateProducttype(
    @Param('id', ParseArrayPipe) id: number,
    @Body() body: UpdateProducttype,
  ) {
    try {
      return await this.producttypeService.updateProducttype(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-product-type/:id')
  async deleteProducttype(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.producttypeService.deleteProducttype(id);
    } catch (error) {
      throw error;
    }
  }
}
