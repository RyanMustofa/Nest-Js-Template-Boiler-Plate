import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { User } from 'src/database/entity/user.entity';
import { UserService } from 'src/database/services/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    let user = await this.userService.getUserByUsername(username);
    if (user && (await compare(password, user.password))) {
      return user;
    }

    return null;
  }
}
