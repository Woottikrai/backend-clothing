import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePassword } from './dto/update-password.dto';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(body: CreateUserDto): Promise<User> {
    try {
      const { name, email, tel, address, img } = body;
      const hashPassWord = await this.hashPassWord(body.password);
      const createUser = await this.userRepository.save({
        name: name,
        email: email,
        tel: tel,
        img: img,
        address: address,
        password: hashPassWord,
      });
      return createUser;
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, body: UpdateUserDto) {
    try {
      const { name, img, tel, address } = body;

      const updateUser = await this.userRepository.update(id, {
        name: name,
        img: img,
        tel: tel,
        address: address,
      });

      return updateUser;
    } catch (error) {
      throw error;
    }
  }

  async findUserAll() {
    try {
      const findUserAll = await this.userRepository.find({
        relations: ['role', 'user.role', 'cart', 'user.cart'],
      });
      return findUserAll;
    } catch (error) {
      throw error;
    }
  }

  async findOneUser(id: number) {
    try {
      const findOneUser = await this.userRepository.findOneBy({ id: id });
      return findOneUser;
    } catch (error) {
      throw error;
    }
  }

  async deleteUser(id: number) {
    try {
      const deleteUser = await this.userRepository.softDelete({ id: id });
      return deleteUser;
    } catch (error) {
      throw error;
    }
  }

  async hashPassWord(password: string) {
    try {
      const SALT = bcrypt.genSaltSync();
      return bcrypt.hashSync(password, SALT);
    } catch (error) {
      throw error;
    }
  }
}
