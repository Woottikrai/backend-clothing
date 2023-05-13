import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SizeService } from './size.service';
import { CreateSizeDto, UpdateSizeDto } from './dto/create-size.dto';

@ApiTags('size')
@Controller('size')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post('create-size')
  async createSize(@Body() body: CreateSizeDto) {
    try {
      return await this.sizeService.createSize(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-sizeAll')
  async getSizeAll() {
    try {
      return await this.sizeService.getSizeAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('get-sizeOne')
  async getSizeOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.sizeService.getSizeOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update-size/:id')
  async updateSize(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateSizeDto,
  ) {
    try {
      return await this.sizeService.updateSize(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-size/:id')
  async deleteSize(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.sizeService.deleteSize(id);
    } catch (error) {
      throw error;
    }
  }
}
