import { Suitability } from 'src/entities/suitability.entity';
import { SuitabilityService } from './suitability.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { SuitabilityController } from './suitability.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Suitability])],
  providers: [SuitabilityService, SuitabilityModule],
  controllers: [SuitabilityController],
  exports: [SuitabilityModule, SuitabilityService],
})
export class SuitabilityModule {}
