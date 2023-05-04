import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { StockService } from './stock.service';
import { CreateStockDto, UpdateStockDto } from './dto/create-stock.dto';

@Controller()
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  async createStock(body: CreateStockDto) {
    try {
      return await this.stockService.createStock(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findStockAll() {
    try {
      return await this.stockService.findStockAll();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findStockOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.stockService.findStockOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch()
  async updateStock(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateStockDto,
  ) {
    try {
      return await this.stockService.updateStock(id, body);
    } catch (error) {
      throw error;
    }
  }
}
