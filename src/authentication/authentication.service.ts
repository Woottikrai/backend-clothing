import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async siginin(email: string, pass: string) {
    const user = await this.userRepository.findOne({
      where: { email: email },
      relations: ['role'],
    });

    const compare = await bcrypt.compare(pass, user?.password);

    if (!compare) {
      throw new UnauthorizedException();
    }

    const payload = {
      email: user?.email,
      sub: user?.id,
      roles: user.role.role_name,
    };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      profile: user,
    };
  }

  async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    return user;
  }
}
