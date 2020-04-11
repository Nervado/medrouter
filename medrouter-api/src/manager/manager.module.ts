import { Module } from '@nestjs/common';
import { ManagerController } from './manager.controller';
import { ManagerService } from './manager.service';
import { ManagerRepository } from './manager.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([ManagerRepository])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
