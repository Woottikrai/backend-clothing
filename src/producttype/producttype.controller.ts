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
@Controller('')
export class ProductTypeController {
  constructor(private readonly producttypeService: ProducttypeService) {}

  @Post('')
  async createProducttype(@Body() body: CreateProducttype) {
    try {
      return await this.producttypeService.createProducttype(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProducttypeAll() {
    try {
      return await this.producttypeService.getProducttype();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getproducttypeOne(@Param('id', ParseArrayPipe) id: number) {
    try {
      return await this.producttypeService.getProducttypeOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch()
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

  @Delete()
  async deleteProducttype(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.producttypeService.deleteProducttype(id);
    } catch (error) {
      throw error;
    }
  }
}
