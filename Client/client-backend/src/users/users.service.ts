import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
  ) {}

  findByEmail(email: string) {
    return this.usersRepo.findOne({ where: { email } });
  }

  async createUser(name: string, email: string, passwordHash: string) {
    const user = this.usersRepo.create({
      name,
      email,
      passwordHash,
    });

    return this.usersRepo.save(user);
  }

async incrementTokenVersion(userId: string) {
  const user = await this.usersRepo.findOne({ where: { id: userId } });
  if (user) {
    user.tokenVersion += 1;
    await this.usersRepo.save(user);
  }
}
  async findOneById(id: string) {
  return this.usersRepo.findOne({ where: { id } });
}
}
