import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulesService } from './schedules.service';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
  imports: [ScheduleModule.forRoot(), forwardRef(() => AppointmentsModule)],
  providers: [SchedulesService],
})
export class SchedulesModule {}
