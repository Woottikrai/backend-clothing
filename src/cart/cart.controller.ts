import {
  Controller,
  Post,
  Delete,
  Body,
  Get,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Product } from 'src/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateCartDto } from './dto/create-cart.dto';

@ApiTags('Cart')
@Controller('')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add-to-cart')
  async createCart(@Body() body: CreateCartDto) {
    try {
      return await this.cartService.addTocart(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('cart/:id')
  async getCart(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.cartService.findCartByOrderId(id);
    } catch (error) {
      throw error;
    }
  }
}
