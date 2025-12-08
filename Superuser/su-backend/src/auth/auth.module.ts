import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { HashService } from '../common/hash/hash.service';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

import { Client } from '../clients/client.entity';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({}), // JWT will be configured in AuthService
    TypeOrmModule.forFeature([Client]),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    HashService,
  ],
})
export class AuthModule {}
