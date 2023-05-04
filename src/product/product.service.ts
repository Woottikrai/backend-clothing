import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Repository } from 'typeorm';
import { get } from 'http';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async createProduct(body: CreateProductDto): Promise<Product> {
    try {
      const {
        name,
        detail,
        price,
        img,
        sizeId,
        producttypeId,
        suitabilityId,
        colorId,
      } = body;
      const createProduct = await this.productRepository.save({
        name: name,
        detail: detail,
        price: price,
        img: img,
        sizeId: sizeId,
        producttypeId: producttypeId,
        suitabilityId: suitabilityId,
        colorId: colorId,
      });

      return createProduct;
    } catch (error) {
      throw error;
    }
  }

  async getProductAll() {
    try {
      const getProductAll = await this.productRepository.find({
        relations: [
          'size',
          'size.product',
          'producttype',
          'producttype.product',
          'suitability',
          'suitability.product',
          'color',
          'color.product',
        ],
      });
    } catch (error) {
      throw error;
    }
  }

  async getProductOne(id: number) {
    try {
      const getProductOne = await this.productRepository.findOneBy({ id: id });
      return getProductOne;
    } catch (error) {
      throw error;
    }
  }

  async updateProduct(id: number, body: UpdateProductDto) {
    try {
      const {
        name,
        detail,
        price,
        img,
        sizeId,
        producttypeId,
        suitabilityId,
        colorId,
      } = body;
      const updateProduct = await this.productRepository.update(id, {
        name: name,
        detail: detail,
        price: price,
        img: img,
        sizeId: sizeId,
        producttypeId: producttypeId,
        suitabilityId: suitabilityId,
        colorId: colorId,
      });
      return updateProduct;
    } catch (error) {
      throw error;
    }
  }

  async deleteProduct(id: number) {
    try {
      const deleteProduct = await this.productRepository.softDelete(id);
      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }
}
