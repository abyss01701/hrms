import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users/users.module';
import { TenantSettings } from '../tenant-setting/tenant-setting.entity';
import { InternalController } from './internal.controller';
import { InternalService } from './internal.service';
import { HashService } from '../common/hash/hash.service';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([TenantSettings]),
  ],
  controllers: [InternalController],
  providers: [InternalService, HashService],
})
export class InternalModule {}
