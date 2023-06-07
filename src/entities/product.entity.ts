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
import { Exclude, Expose } from 'class-transformer';

@Entity('product')
export class Product extends Base {
  @Column({ length: 150 })
  name: string;

  @Column({ length: 150 })
  detail: string;

  @Column({ nullable: true })
  price: number;

  @Column({ nullable: true })
  img: string;

  @ManyToOne(() => Size, (size) => size.product)
  size: Size;
  @Column({ nullable: true })
  @Exclude()
  sizeId: number;

  @ManyToOne(() => ProductType, (productype) => productype.product)
  producttype: ProductType;
  @Column({ nullable: true })
  @Exclude()
  producttypeId: number;

  //วัย
  @ManyToOne(() => Suitability, (suitability) => suitability.product)
  suitability: Suitability;
  @Column({ nullable: true })
  @Exclude()
  suitabilityId: number;

  @ManyToOne(() => Color, (color) => color.product)
  color: Color;
  @Column({ nullable: true })
  @Exclude()
  colorId: number;

  @OneToOne(() => Stock, (stock) => stock.product)
  @JoinColumn()
  stock: Relation<Stock>;
  @Column({ nullable: true })
  @Exclude()
  stockId: number;

  @ManyToOne(() => Cart, (cart) => cart.product)
  cart: Cart;
  @Column({ nullable: true })
  @Expose()
  cartId: number;
}
