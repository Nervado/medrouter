import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrescriptionsService } from 'src/prescriptions/prescriptions.service';
import { MedicineDto } from './dto/medicine.dto';
import { User } from 'src/users/models/user.entity';
import { Medicine } from './models/medicine.entity';

@Injectable()
export class MedicinesService {
  constructor(private ps: PrescriptionsService) {}

  async create(medicineDto: MedicineDto, user: User): Promise<void> {
    const prescription = await this.ps.findById(medicineDto.prescriptionId);

    if (!prescription) {
      throw new BadRequestException('Prescription not exists!');
    }

    if (user.userId !== prescription.doctor.user.userId) {
      throw new UnauthorizedException('Not allowed');
    }

    const medicine = new Medicine();

    medicine.prescription = prescription;

    Medicine.merge(medicine, medicineDto);

    try {
      await medicine.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Creation of medicine has fail');
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await Medicine.delete(id);
    } catch (error) {
      throw new InternalServerErrorException('Fail at delete medicine');
    }
  }
}
