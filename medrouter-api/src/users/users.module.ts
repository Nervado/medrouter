import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthModule } from '../auth/auth.module';
import { EmailsModule } from '../emails/emails.module';
import { AvatarsModule } from 'src/avatars/avatars.module';
import { AddressModule } from 'src/address/address.module';

import { ClientModule } from 'src/client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    EmailsModule,
    AuthModule,
    AvatarsModule,
    AddressModule,
    forwardRef(() => ClientModule),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
