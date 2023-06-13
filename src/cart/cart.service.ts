import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { CreateCartDto, UpdateCaetDto } from './dto/create-cart.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
  ) {}
  async findCartOrder(id: number) {
    try {
      const queryBuilder = this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.status', 'status')
        .leftJoinAndSelect('cart.user', 'user')
        .where('user.id = :id', { id })
        .andWhere('cart.status = :id', { id: 1 });
      return await queryBuilder.getOne();
    } catch (error) {
      throw error;
    }
  }

  async generateOriderId() {
    try {
      let result = '';
      const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;

      for (let i = 0; i < 5; i++) {
        const randomIndex = Math.floor(Math.random() * charactersLength);
        result += characters.charAt(randomIndex);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }
  //---------------------create Caert--------------------
  async addTocart(body: CreateCartDto) {
    try {
      const { userId, productId, sumPrice, quantity } = body;
      let orderId = '';
      const cartOrder = await this.findCartOrder(userId);

      if (cartOrder) {
        orderId = cartOrder.orderId;
      } else {
        const result = await this.generateOriderId();
        orderId = result;
      }

      return await this.cartRepository.save({
        userId: userId,
        productId: productId,
        sumPrice: sumPrice,
        orderId,
        statusId: 1,
        quantity,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateCart(id: number, body: UpdateCaetDto) {
    try {
      const { quantity, sumPrice } = body;
      const updateCart = this.cartRepository.update(id, {
        quantity: quantity,
        sumPrice: sumPrice,
      });
      return await updateCart;
    } catch (error) {
      throw error;
    }
  }

  async findCartByOrderId(userId: number, orderId: string, status: string) {
    try {
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.statusId', 'sid')
        .where('cart.orderId = :orderId', { orderId })
        .andWhere('cart.sid = :status_name', { status })
        .andWhere('cart.userId = :id', { userId });
      return queryBuilder.getMany();
    } catch (error) {
      throw error;
    }
  }

  async deleteFromCart(id: number) {
    try {
      const deleteFromCart = this.cartRepository.softRemove({ id });
      return await deleteFromCart;
    } catch (error) {
      throw error;
    }
  }

  async getOrderForAdmin(orderId: string) {
    try {
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .where('cart.orderId = :orderId', { orderId })
        .andWhere('cart.statusId = :id', { id: 2 })
        .groupBy('entity.status')
        .getMany();
      return queryBuilder;
    } catch (error) {
      throw error;
    }
  }
}
