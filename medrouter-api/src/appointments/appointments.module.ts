import { Module, forwardRef } from '@nestjs/common';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './models/appointment.entity';
import { ClientModule } from 'src/client/client.module';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { EmailsModule } from 'src/emails/emails.module';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]),
    forwardRef(() => DoctorsModule),
    ClientModule,
    EmailsModule,
    NotificationsModule,
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
  exports: [AppointmentsService],
})
export class AppointmentsModule {}
