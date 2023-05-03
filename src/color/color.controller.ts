import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ColorSerivce } from './color.service';
import { CreateColorDto, UpdateColorDto } from './dto/color.dto';
import { Post } from '@nestjs/common';

@ApiTags('color')
@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorSerivce) {}

  @Post()
  async createColor(@Body() body: CreateColorDto) {
    try {
      return await this.colorService.createColor(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getAllColor() {
    try {
      return await this.colorService.getColorAll();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getCoorOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.colorService.getClorOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch()
  async updateColor(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateColorDto,
  ) {
    try {
      return await this.colorService.updateColor(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async deleteColor(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.colorService.deleteColor(id);
    } catch (error) {
      throw error;
    }
  }
}
