import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Patch } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  async createUser(@Body() body: CreateUserDto) {
    try {
      return await this.userService.createUser(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('find-user-all')
  async getUserAll() {
    try {
      return await this.userService.findUserAll();
    } catch (error) {
      throw error;
    }
  }

  @Patch('update:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUser);
  }
}
