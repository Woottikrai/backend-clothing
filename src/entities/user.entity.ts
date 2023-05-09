import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Role } from './role.entity';
import { Size } from './size.entity';
import { Cart } from './cart.entity';
import { Exclude } from 'class-transformer';

@Entity('user')
export class User extends Base {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 150 })
  password: string;

  @Column({ nullable: true })
  img: string;

  @Column({ nullable: true })
  tel: string;

  @Column({ nullable: true })
  address: string;

  @ManyToOne(() => Role, (role) => role.user, { nullable: true })
  role: Role;
  @Exclude()
  roleId: number;

  @OneToMany(() => Cart, (cart) => cart.user, { cascade: true, nullable: true })
  cart: Cart;
  @Exclude()
  cartId: number;
}
