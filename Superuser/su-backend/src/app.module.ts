import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule } from './clients/clients.module';
import { Client } from './clients/client.entity';

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
      entities: [User, Client],
      synchronize: true,
      logging: false,
      
    }),
    AuthModule,
    UsersModule,
    ClientsModule,
  ],
  controllers: [],
  providers: [],
  
})
export class AppModule {}
