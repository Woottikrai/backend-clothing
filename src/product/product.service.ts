import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { get } from 'http';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterQueryProduct } from './dto/filter-product.dto';

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

  async getProductAll(filter: FilterQueryProduct) {
    try {
      const {
        producttype,
        suitability,
        color,
        getOffset,
        pagination,
        limit,
        size,
        name,
      } = filter;
      const getProductAll = this.productRepository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.size', 'pz')
        .leftJoinAndSelect('product.producttype', 'pp')
        .leftJoinAndSelect('product.suitability', 'ps')
        .leftJoinAndSelect('product.color', 'pc')
        .orderBy('product.CreateAt', 'DESC');
      if (producttype) {
        getProductAll.orWhere('product.producttype =:producttype', {
          producttype: producttype,
        });
      }

      if (suitability) {
        getProductAll.orWhere('product.suitability =:suitability', {
          suitability: suitability,
        });
      }

      if (color) {
        getProductAll.orWhere('product.color =:color', {
          color: color,
        });
      }

      if (size) {
        getProductAll.orWhere('product.size =:size', {
          size: size,
        });
      }

      if (name) {
        getProductAll.orWhere('product.name ILIKE :name', {
          name: `%${name}%`,
        });
      }

      if (pagination) {
        getProductAll.skip(getOffset(filter)).take(limit);
      }

      return await getProductAll.getManyAndCount();
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
      const deleteProduct = await this.productRepository.softRemove({ id: id });
      return deleteProduct;
    } catch (error) {
      throw error;
    }
  }
}
