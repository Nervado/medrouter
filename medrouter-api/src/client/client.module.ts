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

@Module({
  imports: [
    TypeOrmModule.forFeature([Client, Appointment, Exam]),
    forwardRef(() => UsersModule),
    PhotosModule,
    PrescriptionsModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
