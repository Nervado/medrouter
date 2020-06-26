import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DoctorRepository } from './doctor.repository';
import { Schedule } from './models/schedule.entity';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
  imports: [
    AppointmentsModule,
    UsersModule,
    TypeOrmModule.forFeature([DoctorRepository, Schedule]),
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
