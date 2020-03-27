import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ username: username });
  }

  async addUser(user: User): Promise<string> {
    const u = new User();
    u.username = user.username;
    u.password = user.password;
    u.mobile = user.mobile;
    u.email = user.mobile;
    await this.userRepository.save(u);
    return '新增用户成功';
  }
}
