import { Module } from '@nestjs/common';
import { MedicinesController } from './medicines.controller';
import { MedicinesService } from './medicines.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Medicine } from './models/medicine.entity';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Medicine]), PrescriptionsModule],
  controllers: [MedicinesController],
  providers: [MedicinesService],
})
export class MedicinesModule {}
