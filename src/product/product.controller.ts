import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(body: CreateProductDto) {
    try {
      return await this.productService.createProduct(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProductAll() {
    try {
      return await this.productService.getProductAll();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getProductOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.productService.getProductOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch()
  async updateProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
  ) {
    try {
      return await this.productService.updateProduct(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.productService.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }
}
