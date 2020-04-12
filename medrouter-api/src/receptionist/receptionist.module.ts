import { Module } from '@nestjs/common';
import { ReceptionistController } from './receptionist.controller';
import { ReceptionistService } from './receptionist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receptionist } from './models/receptionist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receptionist])],
  controllers: [ReceptionistController],
  providers: [ReceptionistService],
})
export class ReceptionistModule {}
