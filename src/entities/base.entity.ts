import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @CreateDateColumn()
  CreateAt: Date;

  @Column()
  @UpdateDateColumn()
  UpdateAt: Date;

  @Column()
  @DeleteDateColumn()
  DeleteAt: Date;
}
