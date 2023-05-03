import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Suitability } from 'src/entities/suitability.entity';
import { Repository } from 'typeorm';
import {
  CreateSuitabilityDto,
  UpdateSuitabilityDto,
} from './dto/create-suitability.dto';
import { get } from 'http';

@Injectable()
export class SuitabilityService {
  constructor(
    @InjectRepository(Suitability)
    private suitabilityRepository: Repository<Suitability>,
  ) {}

  async createSuitability(body: CreateSuitabilityDto): Promise<Suitability> {
    try {
      const createSuitability = await this.suitabilityRepository.save(body);
      return createSuitability;
    } catch (error) {
      throw error;
    }
  }

  async getSuitabulityAll(): Promise<Suitability[]> {
    try {
      const getSuitabulityAll = await this.suitabilityRepository.find();
      return getSuitabulityAll;
    } catch (error) {
      throw error;
    }
  }

  async getSuitabulityOne(id: number): Promise<Suitability> {
    try {
      const getSuitabulityOne = await this.suitabilityRepository.findOneBy({
        id: id,
      });
      return getSuitabulityOne;
    } catch (error) {
      throw error;
    }
  }

  async updateSuitability(id: number, body: UpdateSuitabilityDto) {
    try {
      const updateSuitability = await this.suitabilityRepository.update(
        id,
        body,
      );
      return updateSuitability;
    } catch (error) {
      throw error;
    }
  }
}
