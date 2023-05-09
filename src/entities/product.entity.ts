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
import { Exclude } from 'class-transformer';

@Entity('product')
export class Product extends Base {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  detail: string;

  @Column()
  price: number;

  @Column()
  img: string;

  @ManyToOne(() => Size, (size) => size.product)
  size: Size;
  @Column()
  @Exclude()
  sizeId: number;

  @ManyToOne(() => ProductType, (productype) => productype.product)
  producttype: ProductType;
  @Column()
  @Exclude()
  producttypeId: number;

  //วัย
  @ManyToOne(() => Suitability, (suitability) => suitability.product)
  suitability: Suitability;
  @Column()
  @Exclude()
  suitabilityId: number;

  @ManyToOne(() => Color, (color) => color.product)
  color: Color;
  @Column()
  @Exclude()
  colorId: number;

  @OneToOne(() => Stock, (stock) => stock.product)
  @JoinColumn()
  stock: Relation<Stock>;
  @Column()
  @Exclude()
  stockId: number;

  @ManyToOne(() => Cart, (cart) => cart.product)
  cart: Cart;
}
