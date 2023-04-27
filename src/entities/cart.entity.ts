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

@Entity('cart')
export class Cart extends Base {
  @Column()
  quantity: number;

  @OneToMany(() => Product, (product) => product.cart, { cascade: true })
  product: Product[];

  @ManyToOne(() => Status, (status) => status.cart)
  status: Status;

  @OneToOne(() => User, (user) => user.cart)
  @JoinColumn()
  user: Relation<User>;
}
