import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { configService } from './config/config.service';
import { MongoOptions } from './config/mongo.config';

import { UsersModule } from './users/users.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';
import { AvatarsModule } from './avatars/avatars.module';
import { SchedulesModule } from './schedules/schedules.module';
import { EmailsModule } from './emails/emails.module';
import { DocsModule } from './docs/docs.module';

import { PhotosModule } from './photos/photos.module';
import { AddressModule } from './address/address.module';
import { ReceptionistModule } from './receptionist/receptionist.module';
import { OwnerModule } from './owner/owner.module';
import { ManagerModule } from './manager/manager.module';
import { ClientModule } from './client/client.module';
import { DoctorsModule } from './doctors/doctors.module';
import { LabsModule } from './labs/labs.module';
import { ExamsModule } from './exams/exams.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { MedicinesModule } from './medicines/medicines.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeORMConfig()),
    MongooseModule.forRoot(configService.getMongoConfig(), MongoOptions),
    UsersModule,
    NotificationsModule,
    AuthModule,
    AvatarsModule,
    SchedulesModule,
    EmailsModule,
    DocsModule,
    PhotosModule,
    AddressModule,
    // Application core modules
    ReceptionistModule,
    OwnerModule,
    ManagerModule,
    ClientModule,
    DoctorsModule,
    LabsModule,
    ExamsModule,

    PrescriptionsModule,
    MedicinesModule,
    AppointmentsModule,
  ],
})
export class AppModule {}
