import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { StatusService } from './status.service';
import { CreateStatusDto } from './dto/create-status.dto';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post()
  async createStatus(body: CreateStatusDto) {
    try {
      return await this.statusService.createStatus(body);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getStatusAll() {
    try {
      return await this.statusService.getStatusAll();
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async getStatusOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.statusService.getStatusOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch()
  async updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CreateStatusDto,
  ) {
    try {
      return await this.statusService.updateStatus(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete()
  async deleteStatus(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.statusService.deleteStatus(id);
    } catch (error) {
      throw error;
    }
  }
}
