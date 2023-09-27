import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}
  async getTitle(): Promise<string> {
    return 'this is user';
  }
  async getData(): Promise<any> {
    return await this.userRepository.find();
  }

  async getUserByUsername(username: string): Promise<User> {
    return await this.userRepository.findOne({
      where: {
        username,
      },
    });
  }

  async insertUser(data: any): Promise<any> {
    return await this.userRepository.insert({
      ...data,
    });
  }
}
