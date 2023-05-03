import { Module } from '@nestjs/common';
import { ProductType } from 'src/entities/producttype.entity';
import { ProducttypeService } from './producttype.service';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ProductType])],
  providers: [ProducttypeService, ProducttypeModule],
  // controllers: [UserController],
  exports: [ProducttypeModule, ProducttypeService],
})
export class ProducttypeModule {}
