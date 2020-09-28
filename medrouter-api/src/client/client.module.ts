import { Module, forwardRef } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './models/client.entity';
import { UsersModule } from 'src/users/users.module';
import { PhotosModule } from 'src/photos/photos.module';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';
import { Appointment } from 'src/appointments/models/appointment.entity';
import { Exam } from 'src/exams/models/exam.entity';

import { NonClientsController } from './non-clients.controller';
import { Prescription } from 'src/prescriptions/models/prescription.entity';
import { Doctor } from 'src/doctors/models/doctor.entity';
import { Schedule } from 'src/doctors/models/schedule.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { Owner } from 'src/owner/models/owner.entity';
import { User } from 'src/users/models/user.entity';
import { EmailsModule } from 'src/emails/emails.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Client,
      Appointment,
      Exam,
      Prescription,
      Doctor,
      Schedule,
      Owner,
      User,
    ]),
    forwardRef(() => UsersModule),
    PhotosModule,
    PrescriptionsModule,
    NotificationsModule,
    EmailsModule,
  ],
  controllers: [ClientController, NonClientsController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
