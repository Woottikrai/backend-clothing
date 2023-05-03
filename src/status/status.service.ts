import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/entities/status.entity';
import { Repository } from 'typeorm';
import { CreateStatusDto, UpdateStatusDto } from './dto/create-status.dto';
import { create } from 'domain';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>,
  ) {}

  async createStatus(body: CreateStatusDto) {
    try {
      const createStatus = await this.statusRepository.save(body);
      return createStatus;
    } catch (error) {
      throw error;
    }
  }

  async getStatusAll() {
    try {
      const getStatusAll = await this.statusRepository.find();
      return getStatusAll;
    } catch (error) {
      throw error;
    }
  }

  async getStatusOne(id: number) {
    try {
      const getStatusOne = await this.statusRepository.findOneBy({ id: id });
      return getStatusOne;
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(id: number, body: UpdateStatusDto) {
    try {
      const updateStatus = await this.statusRepository.update(id, body);
      return updateStatus;
    } catch (error) {
      throw error;
    }
  }

  async deleteStatus(id: number) {
    try {
      const deleteStatus = await this.statusRepository.softDelete(id);
      return deleteStatus;
    } catch (error) {
      throw error;
    }
  }
}
