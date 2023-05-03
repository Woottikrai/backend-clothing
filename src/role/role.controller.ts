import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateRoleDto } from './dto/create.dto';
import { UpdateRole } from './dto/update-role.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create-role')
  async post(@Body() body: CreateRoleDto) {
    try {
      return await this.roleService.createRole(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('get-position')
  async getPosition() {
    try {
      return await this.roleService.findRoleAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('get-position-one')
  async getPositionOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.roleService.findRoleOne(id);
    } catch (error) {
      throw error;
    }
  }
  @Patch('update-position')
  async updatePosition(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateRole,
  ) {
    try {
      return await this.roleService.updateRole(id, body);
    } catch (error) {
      throw error;
    }
  }

  @Delete('delete-role')
  async deleteRole(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.roleService.deleteRole(id);
    } catch (error) {
      throw error;
    }
  }
}
