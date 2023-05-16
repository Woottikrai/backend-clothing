import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateUserDto, Register } from './dto/create-user.dto';
import { Patch } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async createUser(@Body() body: Register) {
    try {
      return await this.userService.registerUser(body);
    } catch (error) {
      throw error;
    }
  }

  @Get('find-all')
  async getUserAll() {
    try {
      return await this.userService.findUserAll();
    } catch (error) {
      throw error;
    }
  }

  @Patch('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUser: UpdateUserDto,
  ) {
    return await this.userService.updateUser(id, updateUser);
  }

  @Patch('update-password/:id')
  async updatePassword(
    @Param('id', ParseIntPipe) id: number,
    @Body() password: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, password);
  }

  @Delete('delete-user/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw error;
    }
  }
}
