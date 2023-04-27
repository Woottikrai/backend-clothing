import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Product } from './product.entity';

@Entity('suitability')
export class Suitability extends Base {
  @Column()
  suitability: string;

  @OneToMany(() => Product, (product) => product.suitability, { cascade: true })
  product: Product[];
}
