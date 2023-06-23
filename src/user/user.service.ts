import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, Register } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { error } from 'console';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async registerUser(body: Register): Promise<User> {
    try {
      const { name, email, password } = body;
      const hashPassWord = await this.hashPassWord(password);
      const userRole = 1;
      const registerUser = await this.userRepository.save({
        name: name,
        email: email,
        password: hashPassWord,
        roleId: userRole,
      });
      return registerUser;
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

  async updatePassword(id: number, body: UpdatePasswordDto) {
    try {
      const { password, oldPassword } = body;
      const finduser = await this.findOneUser(id);
      const compare = await bcrypt.compare(password, finduser.password);
      if (!compare) {
        throw new UnauthorizedException();
      }
      const updateHash = await this.hashPassWord(password);
      const updatePassword = await this.userRepository.update(id, {
        password: updateHash,
      });
      return updatePassword;
    } catch (error) {
      throw error;
    }
  }

  async findUserAll() {
    try {
      const findUserAll = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.role', 'ur')
        .leftJoinAndSelect('user.cart', 'uc')
        .getMany();
      return findUserAll;
    } catch (error) {
      throw error;
    }
  }

  async findOneUser(id: number) {
    try {
      const findOneUser = await this.userRepository.findOne({
        where: { id: id },
        relations: ['role'],
      });
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
