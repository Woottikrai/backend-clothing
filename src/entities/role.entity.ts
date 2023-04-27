import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';

@Entity('Role')
export class Role extends Base {
  @Column()
  role_name: string;

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  user: User[];
}
