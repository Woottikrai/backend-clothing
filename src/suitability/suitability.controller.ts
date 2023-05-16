import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { SuitabilityService } from './suitability.service';
import {
  CreateSuitabilityDto,
  UpdateSuitabilityDto,
} from './dto/create-suitability.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('suitability')
@Controller('suitability')
export class SuitabilityController {
  constructor(private readonly SuitabilityService: SuitabilityService) {}

  @Post('suitability')
  async createSuitability(@Body() body: CreateSuitabilityDto) {
    try {
      return await this.SuitabilityService.createSuitability(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('suitability-all')
  async getSuitabilityAll() {
    try {
      return await this.SuitabilityService.getSuitabulityAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('suitability-one/:id')
  async getSuitabilityOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.SuitabilityService.getSuitabulityOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update/:id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSuitabilityDto,
  ) {
    try {
      return await this.SuitabilityService.updateSuitability(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete/:id')
  async deletesuitability(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.SuitabilityService.deleteSuitability(id);
    } catch (error) {
      throw error;
    }
  }
}
