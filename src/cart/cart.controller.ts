import { Controller, Post, Delete, Body, Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { Product } from 'src/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateCartDto } from './dto/create-cart.dto';

@ApiTags('Cart')
@Controller('cart')
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
}
