import * as redisStore from 'cache-manager-redis-store';
import { CacheModule, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandModule } from './demand/demand.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProjectModule } from './project/project.module';

@Module({
  imports: [
    // CacheModule.register({ store: redisStore, host: 'localhost', port: 6379 }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'work_test',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DemandModule,
    AuthModule,
    UsersModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
