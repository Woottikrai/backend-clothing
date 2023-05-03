import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Color } from 'src/entities/color.entity';
import { Repository } from 'typeorm';
import { CreateColorDto, UpdateColorDto } from './dto/color.dto';

@Injectable()
export class ColorSerivce {
  constructor(
    @InjectRepository(Color)
    private colorRepository: Repository<Color>,
  ) {}

  async createColor(body: CreateColorDto) {
    try {
      const createColor = await this.colorRepository.save(body);
      return createColor;
    } catch (error) {
      throw error;
    }
  }

  async getColorAll() {
    try {
      const getColorAll = await this.colorRepository.find();
      return getColorAll;
    } catch (error) {
      throw error;
    }
  }

  async getClorOne(id: number) {
    try {
      const getColorOne = await this.colorRepository.findOneBy({ id: id });
      return getColorOne;
    } catch (error) {
      throw error;
    }
  }

  async updateColor(id: number, body: UpdateColorDto) {
    try {
      const updateColor = await this.colorRepository.update(id, body);
      return updateColor;
    } catch (error) {
      throw error;
    }
  }

  async deleteColor(id: number) {
    try {
      const deleteColor = await this.colorRepository.softDelete(id);
      return deleteColor;
    } catch (error) {
      throw error;
    }
  }
}
