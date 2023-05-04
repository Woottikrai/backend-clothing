import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStockDto, UpdateStockDto } from './dto/create-stock.dto';
import { Stock } from 'src/entities/stock.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private stockRepository: Repository<Stock>,
  ) {}

  async createStock(body: CreateStockDto) {
    try {
      const { quantity, productId } = body;
      const createStock = await this.stockRepository.save({
        quantity: quantity,
        productId: productId,
      });
      return createStock;
    } catch (error) {
      throw error;
    }
  }

  async findStockAll() {
    try {
      const findStockAll = await this.stockRepository.find({
        relations: ['product', 'product.stock'],
      });
      return findStockAll;
    } catch (error) {
      throw error;
    }
  }

  async findStockOne(id: number) {
    try {
      const findStockOne = await this.stockRepository.findOneBy({ id: id });
      return findStockOne;
    } catch (error) {
      throw error;
    }
  }

  async updateStock(id: number, body: UpdateStockDto) {
    try {
      const updateStock = await this.stockRepository.update(id, body);
      return updateStock;
    } catch (error) {
      throw error;
    }
  }

  async deleteStock(id: number) {
    try {
      const deleteStock = await this.stockRepository.softDelete(id);
      return deleteStock;
    } catch (error) {
      throw error;
    }
  }
}
