import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Color } from './color.entity';
import { Size } from './size.entity';
import { Suitability } from './suitability.entity';
import { Product } from './product.entity';

@Entity('productType')
export class ProductType extends Base {
  @Column()
  producttype_name: string;

  @OneToMany(() => Product, (product) => product.producttype, { cascade: true })
  product: Product[];
}
