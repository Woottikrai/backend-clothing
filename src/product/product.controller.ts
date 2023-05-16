import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterQueryProduct } from './dto/filter-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  async createProduct(@Body() body: CreateProductDto) {
    try {
      return await this.productService.createProduct(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('find-all')
  async getProductAll(@Query() filter: FilterQueryProduct) {
    try {
      const { limit, page, getPageCount } = filter;
      const [data, count] = await this.productService.getProductAll(filter);

      return {
        data: data,
        count: count,
        page: page,
        limit: limit,
        pageCount: getPageCount(limit, count),
      };
    } catch (error) {
      throw error;
    }
  }

  @Get('find-one/:id')
  async getProductOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.productService.getProductOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update/:id')
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

  @Delete('delete/:id')
  async deleteProduct(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.productService.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }
}
