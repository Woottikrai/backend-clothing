import { Size } from 'src/entities/size.entity';
import { SizeService } from './size.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SizeController } from './size.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Size])],
  providers: [SizeService, SizeModule],
  controllers: [SizeController],
  exports: [SizeModule, SizeService],
})
export class SizeModule {}
