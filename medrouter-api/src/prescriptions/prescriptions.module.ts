import { Module } from '@nestjs/common';
import { PrescriptionsController } from './prescriptions.controller';
import { PrescriptionsService } from './prescriptions.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from 'src/users/users.module';
import { UserRepository } from 'src/users/user.repository';

@Module({
  imports: [UsersModule],
  controllers: [PrescriptionsController],
  providers: [PrescriptionsService, UsersService, UserRepository],
})
export class PrescriptionsModule {}
