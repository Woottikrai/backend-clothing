import { Status } from 'src/entities/status.entity';
import { StatusService } from './status.service';
import { StatusController } from './status.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Status])],
  providers: [StatusService, StatusModule],
  controllers: [StatusController],
  exports: [StatusService, StatusService],
})
export class StatusModule {}
