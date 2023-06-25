import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { And, QueryBuilder, Repository, getConnection } from 'typeorm';
import { CreateCartDto, UpdateCaetDto } from './dto/create-cart.dto';
import { Product } from 'src/entities/product.entity';
import { User } from 'src/entities/user.entity';

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

  //show for user
  async findCartByOrderId(id: number) {
    try {
      const queryBuilder = this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'product')
        .leftJoinAndSelect('product.size', 'size')
        .leftJoinAndSelect('product.producttype', 'type')
        .leftJoinAndSelect('product.color', 'c')
        .leftJoinAndSelect('product.suitability', 's')
        .leftJoinAndSelect('cart.status', 'status')
        .where('status.Id = :id', { id: 1 })
        .andWhere('cart.userId = :id', { id });

      return await queryBuilder.getMany();
    } catch (error) {
      throw error;
    }
  }

  // user ยืนยันการสั่งซื้อ
  async cartConfirm(id: number, body: UpdateCaetDto) {
    try {
      const { orderId } = body;
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'product')
        .leftJoinAndSelect('product.size', 'size')
        .leftJoinAndSelect('product.producttype', 'type')
        .leftJoinAndSelect('product.color', 'c')
        .leftJoinAndSelect('product.suitability', 's')
        .leftJoinAndSelect('cart.status', 'sid')
        .where('cart.user = :id', { id: id })
        .andWhere('sid.id  = :id', { id: 1 })
        .andWhere('cart.orderId = :orderId', { orderId: orderId })
        .getMany();

      if (queryBuilder.length > 0) {
        for (const data of queryBuilder) {
          await this.cartRepository.update(data.id, { statusId: 2 });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  //admin กดยืนยัน
  async cartSuscess(id: number, body: UpdateCaetDto) {
    try {
      const { orderId } = body;
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'product')
        .leftJoinAndSelect('product.size', 'size')
        .leftJoinAndSelect('product.producttype', 'type')
        .leftJoinAndSelect('product.color', 'c')
        .leftJoinAndSelect('product.suitability', 's')
        .leftJoinAndSelect('cart.status', 'sid')
        .where('cart.user = :id', { id: id })
        .andWhere('sid.id  = :id', { id: 1 })
        .andWhere('cart.orderId = :orderId', { orderId: orderId })
        .getMany();

      if (queryBuilder.length > 0) {
        for (const data of queryBuilder) {
          await this.cartRepository.update(data.id, { statusId: 3 });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async findOrderForAdmin() {
    try {
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.status', 'status')
        .leftJoinAndSelect('cart.product', 'product')
        .leftJoinAndSelect('product.size', 's')
        .leftJoinAndSelect('product.color', 'color')
        .leftJoinAndSelect('product.producttype', 'p')
        .leftJoinAndSelect('product.suitability', 'suitability')
        .leftJoinAndSelect('cart.user', 'user')
        .andWhere('status.id = :id', { id: 2 })

        .getMany();
      return queryBuilder;
    } catch (error) {
      throw error;
    }
  }

  //ประวัติการสั่งซื้อ user
  async orderHistory(id: number) {
    try {
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'product')
        .leftJoinAndSelect('cart.status', 'status')
        .where('cart.user = :id', { id })
        .andWhere('status.id  = :id', { id: 3 })
        .groupBy('cart.id')
        .addGroupBy('product.id')
        .addGroupBy('status.id')
        .getMany();
      return queryBuilder;
    } catch (error) {
      throw error;
    }
  }
}
