import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Cart } from './cart.entity';

@Entity('status')
export class Status extends Base {
  @Column()
  status_name: string;

  @OneToMany(() => Cart, (cart) => cart.status, { cascade: true })
  cart: Cart[];
}
