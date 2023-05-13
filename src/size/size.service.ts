import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Size } from 'src/entities/size.entity';
import { Repository } from 'typeorm';
import { CreateSizeDto, UpdateSizeDto } from './dto/create-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private sizeRepository: Repository<Size>,
  ) {}

  async createSize(body: CreateSizeDto): Promise<Size> {
    try {
      const createSize = await this.sizeRepository.save(body);
      return createSize;
    } catch (error) {
      throw error;
    }
  }

  async getSizeAll(): Promise<Size[]> {
    try {
      const getSizeAll = await this.sizeRepository.find();
      return getSizeAll;
    } catch (error) {
      throw error;
    }
  }

  async getSizeOne(id: number): Promise<Size> {
    try {
      const getSizeOne = await this.sizeRepository.findOneBy({ id: id });
      return getSizeOne;
    } catch (error) {
      throw error;
    }
  }

  async updateSize(id: number, body: UpdateSizeDto) {
    try {
      const updateSize = await this.sizeRepository.update(id, body);
      return updateSize;
    } catch (error) {
      throw error;
    }
  }

  async deleteSize(id: number) {
    try {
      const deleteSize = await this.sizeRepository.softDelete(id);
      return deleteSize;
    } catch (error) {
      throw error;
    }
  }
}
