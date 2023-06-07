import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}

  async creatCart(body: CreateCartDto) {
    try {
      const { quantity, productId, statusId, userId } = body;
      for (const product of productId) {
      }
      return;
    } catch (error) {
      throw error;
    }
  }

  async getCartAll() {
    try {
      const getCartAll = await this.cartRepository.find();
      return getCartAll;
    } catch (error) {
      throw error;
    }
  }
}
