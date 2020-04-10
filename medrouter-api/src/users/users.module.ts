import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { EmailsModule } from '../emails/emails.module';
import { AddressService } from '../address/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    EmailsModule,
    AuthModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, AddressService],
  exports: [UsersService],
})
export class UsersModule {}
