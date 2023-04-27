import { Column, Entity, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { Product } from './product.entity';

@Entity('size')
export class Size extends Base {
  @Column()
  size_name: string;

  @OneToMany(() => Product, (product) => product.size, { cascade: true })
  product: Product[];
}
