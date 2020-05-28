import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerRepository } from './owner.repository';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([OwnerRepository])],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
