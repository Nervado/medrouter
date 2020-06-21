import { Module } from '@nestjs/common';
import { ReceptionistController } from './receptionist.controller';
import { ReceptionistService } from './receptionist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceptionistRepository } from './receptionist.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ReceptionistRepository]), UsersModule],
  controllers: [ReceptionistController],
  providers: [ReceptionistService],
})
export class ReceptionistModule {}
