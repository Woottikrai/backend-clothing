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
import { ApiTags } from '@nestjs/swagger';

@ApiTags('status')
@Controller('status')
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post('create')
  async createStatus(@Body() body: CreateStatusDto) {
    try {
      return await this.statusService.createStatus(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-all')
  async getStatusAll() {
    try {
      return await this.statusService.getStatusAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('get-one')
  async getStatusOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.statusService.getStatusOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch('update')
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

  @Delete('delete')
  async deleteStatus(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.statusService.deleteStatus(id);
    } catch (error) {
      throw error;
    }
  }
}
