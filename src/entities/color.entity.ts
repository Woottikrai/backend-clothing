import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Product } from './product.entity';

@Entity('color')
export class Color extends Base {
  @Column()
  color_name: string;

  @OneToMany(() => Product, (product) => product.color, { cascade: true })
  product: Product[];
}
