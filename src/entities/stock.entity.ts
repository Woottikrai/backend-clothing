import { Column, Entity, JoinColumn, OneToOne, Relation } from 'typeorm';
import { Base } from './base.entity';
import { Product } from './product.entity';

@Entity('stock')
export class Stock extends Base {
  @Column()
  quantity: number;

  @OneToOne(() => Product, (product) => product.stock)
  @JoinColumn()
  product: Relation<Product>;
}
