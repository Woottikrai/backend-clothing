import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { RoleController } from './role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  providers: [RoleModule, RoleService],
  controllers: [RoleController],
  exports: [RoleService, RoleModule],
})
export class RoleModule {}
