import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorSerivce } from './color.service';
import { Color } from 'src/entities/color.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorModule, ColorSerivce],
  exports: [ColorSerivce],
})
export class ColorModule {}
