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

  @OneToMany(() => Product, (product) => product.cart, { cascade: true })
  product: Product[];
  @Exclude()
  productId: number[];

  @ManyToOne(() => Status, (status) => status.cart)
  status: Status;
  @Exclude()
  statusId: number;

  @ManyToOne(() => User, (user) => user.cart)
  user: User;
  @Exclude()
  userId: number;
}
