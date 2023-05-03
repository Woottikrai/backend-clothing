import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateRoleDto } from './dto/create.dto';
import { UpdateRole } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async createRole(body: CreateRoleDto): Promise<Role> {
    try {
      const createRole = await this.roleRepository.save(body);
      return createRole;
    } catch (error) {
      throw error;
    }
  }

  async updateRole(id: number, body: UpdateRole) {
    try {
      const updateRole = await this.roleRepository.update(id, { ...body });
      return updateRole;
    } catch (error) {
      throw error;
    }
  }

  async findRoleAll() {
    try {
      const findRoleAll = await this.roleRepository.find();
      return findRoleAll;
    } catch (error) {
      throw error;
    }
  }

  async findRoleOne(id: number) {
    try {
      const findRoleOne = await this.roleRepository.findOneBy({ id: id });
      return findRoleOne;
    } catch (error) {
      throw error;
    }
  }

  async deleteRole(id: number) {
    try {
      const deleteRole = await this.roleRepository.softDelete({ id: id });
    } catch (error) {
      throw error;
    }
  }
}
