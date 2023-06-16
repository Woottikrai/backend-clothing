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

  async deleteFromCart(id: number) {
    try {
      const deleteFromCart = this.cartRepository.softRemove({ id });
      return await deleteFromCart;
    } catch (error) {
      throw error;
    }
  }

  async cartConfirm(userId: number, id: number[]) {
    try {
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.statusId', 'sid')
        .where('cart.userId = :id', { userId })
        .andWhere('caer.sid  = :id', { id: 1 })
        .groupBy('cart.orderId')
        .getMany();

      if (queryBuilder.length > 0) {
        for (const data of queryBuilder) {
          return this.cartRepository.update(id, {
            statusId: (data.statusId = 2),
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async cartSuccess(userId: number, id: number[]) {
    try {
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.statusId', 'sid')
        .addSelect('SUM(cart.sumPrice)', 'sum')
        .where('cart.userId = :id', { userId })
        .andWhere('caer.sid  = :id', { id: 1 })
        .groupBy('cart.orderId')
        .getMany();

      if (queryBuilder.length > 0) {
        for (const data of queryBuilder) {
          return this.cartRepository.update(id, {
            statusId: (data.statusId = 3),
          });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  //show for user
  async findCartByOrderId(id: number) {
    try {
      const queryBuilder = this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'product')
        .leftJoinAndSelect('cart.status', 'status')
        .where('status.Id = :id', { id: 1 })
        .andWhere('cart.userId = :id', { id });

      return await queryBuilder.getMany();
    } catch (error) {
      throw error;
    }
  }

  async findOrderForAdmin() {
    try {
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.status', 'status')
        .andWhere('status.id = :id', { id: 2 })
        .groupBy('cart.orderId')
        .getMany();
      return queryBuilder;
    } catch (error) {
      throw error;
    }
  }
}
