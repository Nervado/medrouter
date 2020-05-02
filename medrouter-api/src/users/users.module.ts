import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { EmailsModule } from '../emails/emails.module';
import { AddressService } from '../address/address.service';
import { AvatarsModule } from 'src/avatars/avatars.module';
import { AvatarsService } from 'src/avatars/avatars.service';
import { AddressModule } from 'src/address/address.module';
//import { AvatarsModule } from 'src/avatars/avatars.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    EmailsModule,
    AuthModule,
    AvatarsModule,
    AddressModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
