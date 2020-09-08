import { Module } from '@nestjs/common';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerRepository } from './owner.repository';
import { Client } from 'src/client/models/client.entity';
import { Receptionist } from 'src/receptionist/models/receptionist.entity';
import { Doctor } from 'src/doctors/models/doctor.entity';
import { Manager } from 'src/manager/models/manager.entity';
import { Appointment } from 'src/appointments/models/appointment.entity';

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([
      OwnerRepository,
      Client,
      Receptionist,
      Doctor,
      Manager,
      Appointment,
    ]),
  ],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [OwnerService],
})
export class OwnerModule {}
