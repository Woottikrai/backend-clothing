import { Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { SuitabilityService } from './suitability.service';
import { CreateSuitabilityDto } from './dto/create-suitability.dto';

@Controller('suitability')
export class SuitabilityController {
  constructor(private readonly SuitabilityService: SuitabilityService) {}

  @Post()
  async createSuitability(body: CreateSuitabilityDto) {
    try {
      return await this.SuitabilityService.createSuitability(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getSuitabilityAll() {
    try {
      return await this.SuitabilityService.getSuitabulityAll();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getSuitabilityOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.SuitabilityService.getSuitabulityOne(id);
    } catch (error) {
      throw error;
    }
  }
}
