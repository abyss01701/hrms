// src/common/hash/hash.service.ts
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';

@Injectable()
export class HashService {
  async hash(password: string): Promise<string> {
    return argon2.hash(password, {
      type: argon2.argon2id, // best variant for password hashing
      memoryCost: 19456,     // ~19 MB
      timeCost: 2,           // iterations
      parallelism: 1,
    });
  }
  async verify(hash: string, plain: string): Promise<boolean> {
    return argon2.verify(hash, plain);
  }
}
