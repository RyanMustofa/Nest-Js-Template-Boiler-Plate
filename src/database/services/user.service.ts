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

  async getDataWithPagination(page: number, limit: number): Promise<any> {
    let offset = (page - 1) * limit;
    let query = await this.userRepository
      .createQueryBuilder('u')
      .offset(offset)
      .limit(limit)
      .select('u.username as username')
      .addSelect('u.name as name')
      .addSelect('u.isActive as isActive')
      .getRawMany();
    return {
      data: query,
      total: await this.userRepository.count(),
    };
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
