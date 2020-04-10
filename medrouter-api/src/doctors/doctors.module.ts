import { Module } from '@nestjs/common';
import { DoctorsController } from './doctors.controller';
import { DoctorsService } from './doctors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DoctorRepository } from './doctor.repository';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([DoctorRepository])],
  controllers: [DoctorsController],
  providers: [DoctorsService],
})
export class DoctorsModule {}
