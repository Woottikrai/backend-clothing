import {
  Controller,
  Post,
  Delete,
  Body,
  Get,
  ParseIntPipe,
  Param,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { Product } from 'src/entities/product.entity';
import { ApiTags } from '@nestjs/swagger';
import { CreateCartDto, UpdateCaetDto } from './dto/create-cart.dto';

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

  @Get('orderhistory/:id')
  async getOrderHis(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.cartService.orderHistory(id);
    } catch (error) {
      throw error;
    }
  }

  @Get('cart-for-admin')
  async getOrderForAdmin() {
    try {
      return await this.cartService.findOrderForAdmin();
    } catch (error) {
      throw error;
    }
  }

  @Patch('cart-confirm/:id')
  async cartConfirm(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCaetDto,
  ) {
    try {
      return await this.cartService.cartConfirm(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Patch('cart-success/:id')
  async cartSuscess(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateCaetDto,
  ) {
    try {
      return await this.cartService.cartSuscess(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-from-cart/:id')
  async deleteFromCart(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.cartService.deleteFromCart(id);
    } catch (error) {
      throw error;
    }
  }
}
