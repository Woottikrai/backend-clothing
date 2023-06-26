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
        .where('cart.userId = :userId', { userId: id })
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
        .leftJoinAndSelect('cart.user', 'user')
        .leftJoinAndSelect('product.size', 'size')
        .leftJoinAndSelect('product.producttype', 'type')
        .leftJoinAndSelect('product.color', 'c')
        .leftJoinAndSelect('product.suitability', 's')
        .leftJoinAndSelect('cart.status', 'status')
        .where('status.id = :id', { id: 1 })
        .andWhere('cart.userId = :userId', { userId: id });

      return await queryBuilder.getMany();
    } catch (error) {
      throw error;
    }
  }

  // user ยืนยันการสั่งซื้อ กดที่ cart
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
        .where('cart.userId = :userId', { userId: id })
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
  async cartSuscess(body: UpdateCaetDto) {
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
        .andWhere('sid.id  = :id', { id: 2 })
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
        .leftJoinAndSelect('cart.user', 'user')
        .leftJoinAndSelect('product.size', 'size')
        .leftJoinAndSelect('product.producttype', 'type')
        .leftJoinAndSelect('product.color', 'c')
        .leftJoinAndSelect('product.suitability', 's')
        .leftJoinAndSelect('cart.status', 'status')
        .where('status.id = :id', { id: 2 })
        .andWhere('cart.userId = :userId', { userId: id });
      return queryBuilder.getMany();
    } catch (error) {
      throw error;
    }
  }

  //ยกเลิกคำสั่งซื้อ
  async deleteOrder(id: number, body: UpdateCaetDto) {
    try {
      const { orderId } = body;
      const queryBuilder = await this.cartRepository
        .createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product', 'product')
        .leftJoinAndSelect('cart.user', 'user')
        .leftJoinAndSelect('product.size', 'size')
        .leftJoinAndSelect('product.producttype', 'type')
        .leftJoinAndSelect('product.color', 'c')
        .leftJoinAndSelect('product.suitability', 's')
        .leftJoinAndSelect('cart.status', 'status')
        .where('status.id = :id', { id: 2 })
        .andWhere('cart.userId = :userId', { userId: id })
        .andWhere('cart.orderId = :ortderId', { userId: orderId })
        .getMany();

      if (queryBuilder.length > 0) {
        for (const data of queryBuilder) {
          await this.cartRepository.softRemove({ id: data.id });
        }
      }
    } catch (error) {
      throw error;
    }
  }

  //ประวัติการขาย
  async findOrderHistoryAdmin() {
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
        .andWhere('status.id = :id', { id: 3 })

        .getMany();
      return queryBuilder;
    } catch (error) {
      throw error;
    }
  }
}
