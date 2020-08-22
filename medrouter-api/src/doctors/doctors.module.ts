import { Module, forwardRef } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { DoctorRepository } from './doctor.repository';
import { Schedule } from './models/schedule.entity';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { ClientModule } from 'src/client/client.module';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DoctorRepository, Schedule]),
    //forwardRef(() => AppointmentsModule),
    AppointmentsModule,
    UsersModule,
    ClientModule,
    PrescriptionsModule,
  ],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
