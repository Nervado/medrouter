import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulesService } from './schedules.service';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { ExamsModule } from 'src/exams/exams.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    forwardRef(() => AppointmentsModule),
    forwardRef(() => ExamsModule),
  ],
  providers: [SchedulesService],
})
export class SchedulesModule {}
