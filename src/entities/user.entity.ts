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

@Entity('user')
export class User extends Base {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;

  @Column({ length: 150 })
  passWord: string;

  @Column()
  img: string;

  @Column()
  tel: string;

  @Column()
  address: string;

  @ManyToOne(() => Role, (role) => role.user)
  role: Role;

  @OneToOne(() => Cart, (cart) => cart.user, { cascade: true })
  @JoinColumn()
  cart: Relation<Cart>;
}
