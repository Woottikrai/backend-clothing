import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Size } from './size.entity';
import { ProductType } from './producttype.entity';
import { Suitability } from './suitability.entity';
import { Color } from './color.entity';
import { Cart } from './cart.entity';
import { Stock } from './stock.entity';

@Entity('product')
export class Product extends Base {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  detail: string;

  @Column()
  price: number;

  @ManyToOne(() => Size, (size) => size.product)
  size: Size;

  @ManyToOne(() => ProductType, (productype) => productype.product)
  producttype: ProductType;

  //วัย
  @ManyToOne(() => Suitability, (suitability) => suitability.product)
  suitability: Suitability;

  @ManyToOne(() => Color, (color) => color.product)
  color: Color;

  @OneToOne(() => Stock, (stock) => stock.product, { cascade: true })
  @JoinColumn()
  stock: Relation<Stock>;

  @ManyToOne(() => Cart, (cart) => cart.product)
  cart: Cart;
}
