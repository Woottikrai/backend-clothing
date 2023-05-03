import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from 'src/entities/producttype.entity';
import { Repository } from 'typeorm';
import {
  CreateProducttype,
  UpdateProducttype,
} from './dto/create-producttype.dto';

@Injectable()
export class ProducttypeService {
  constructor(
    @InjectRepository(ProductType)
    private producttypeRepository: Repository<ProductType>,
  ) {}

  async createProducttype(body: CreateProducttype) {
    try {
      const createProducttype = await this.producttypeRepository.save(body);
      return createProducttype;
    } catch (error) {
      throw error;
    }
  }

  async getProducttype() {
    try {
      const getProducttype = await this.producttypeRepository.find();
      return getProducttype;
    } catch (error) {
      throw error;
    }
  }

  async getProducttypeOne(id: number) {
    try {
      const getProducttypeOne = await this.producttypeRepository.findOneBy({
        id: id,
      });
      return getProducttypeOne;
    } catch (error) {
      throw error;
    }
  }

  async updateProducttype(id: number, body: UpdateProducttype) {
    try {
      const updateProducttype = await this.producttypeRepository.update(
        id,
        body,
      );
      return updateProducttype;
    } catch (error) {
      throw error;
    }
  }

  async deleteProducttype(id: number) {
    try {
      const deleteProducttype = await this.producttypeRepository.softDelete(id);
      return deleteProducttype;
    } catch (error) {
      throw error;
    }
  }
}
