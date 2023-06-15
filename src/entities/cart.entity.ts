import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  Relation,
} from 'typeorm';
import { Base } from './base.entity';
import { Status } from './status.entity';
import { Product } from './product.entity';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity('cart')
export class Cart extends Base {
  @Column()
  quantity: number;

  @Column()
  sumPrice: number;

  @ManyToOne(() => Product, (product) => product.cart)
  product: Product;
  @Column()
  @Exclude()
  productId: number;

  @ManyToOne(() => Status, (status) => status.cart, { nullable: true })
  status: Status;
  @Column({ nullable: true })
  @Exclude()
  statusId: number;

  @ManyToOne(() => User, (user) => user.cart, { nullable: true })
  user: User;
  @Column({ nullable: true })
  @Exclude()
  userId: number;

  @Column()
  orderId: string;
}
