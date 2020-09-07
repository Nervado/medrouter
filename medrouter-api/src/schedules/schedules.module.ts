import { Module, forwardRef } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulesService } from './schedules.service';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { ExamsModule } from 'src/exams/exams.module';
import { ClientModule } from 'src/client/client.module';
import { OwnerModule } from 'src/owner/owner.module';
import ConfigModule from 'src/config/config.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    AppointmentsModule,
    ExamsModule,

    OwnerModule,
    ConfigModule,
    UsersModule,
  ],
  providers: [SchedulesService],
})
export class SchedulesModule {}
