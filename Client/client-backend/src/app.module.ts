import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantSettings } from './tenant-setting/tenant-setting.entity';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { InternalModule } from './internal/internal.module';

@Module({
  imports: [
      ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
  }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, TenantSettings],
      synchronize: true,
      logging: false,
      
    }),
    AuthModule,
    UsersModule,
    InternalModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
