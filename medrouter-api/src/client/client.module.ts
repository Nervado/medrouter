import { Module, forwardRef } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './models/client.entity';
import { UsersModule } from 'src/users/users.module';
import { PhotosModule } from 'src/photos/photos.module';
//import { DoctorsModule } from 'src/doctors/doctors.module';
//import { AppointmentsModule } from 'src/appointments/appointments.module';
//import { DoctorsModule } from 'src/doctors/doctors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    forwardRef(() => UsersModule),
    PhotosModule,
    //AppointmentsModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
