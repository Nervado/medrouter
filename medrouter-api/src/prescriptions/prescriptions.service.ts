import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { Doctor } from 'src/doctors/models/doctor.entity';
import { Client } from 'src/client/models/client.entity';
import { Prescription } from './models/prescription.entity';
import { PrescriptionDto } from './dto/prescription.dto';
import { SearchClientDto } from 'src/client/dtos/search-client-dto';
import { ExamStatus } from 'src/exams/enums/status.enum';

@Injectable()
export class PrescriptionsService {
  async createOne(doctor: Doctor, client: Client): Promise<string> {
    const prescription = new Prescription();

    prescription.doctor = doctor;
    prescription.client = client;

    try {
      await prescription.save();
      return prescription.id;
    } catch (error) {
      throw new InternalServerErrorException('Create prescription failure');
    }
  }

  async findById(id: string): Promise<Prescription> {
    return await Prescription.findOne(id);
  }

  async getOne(id, prescriptionId) {
    const query = Prescription.createQueryBuilder('prescription');

    query.andWhere('doctor.id = :id', { id });

    query.andWhere('prescription.id = :prescriptionId', { prescriptionId });

    const founds = await query
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'doctorUser')
      .leftJoinAndSelect('doctorUser.avatar', 'doctorAvatar')
      .leftJoinAndSelect('prescription.client', 'client')
      .leftJoinAndSelect('prescription.exams', 'exams')
      .leftJoinAndSelect('prescription.medicines', 'medicines')
      .leftJoinAndSelect('client.user', 'clientUser')
      .leftJoinAndSelect('clientUser.avatar', 'clientAvatar')
      .getOne();

    return this.serializePrescription(founds);
  }

  async getAll(
    id: string,
    search: SearchClientDto,
  ): Promise<PrescriptionDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = Prescription.createQueryBuilder('prescription');

    if (id) {
      query.andWhere('doctor.id = :id', { id: id });
    }

    if (username) {
      query.andWhere(
        `clientUser.username ILIKE '%${username}%' OR  clientUser.surname ILIKE '%${username}%' `,
      );
    }

    const founds = await query
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('prescription.medicines', 'medicines')
      .leftJoinAndSelect('prescription.exams', 'exams')
      .leftJoinAndSelect('doctor.user', 'doctorUser')
      .leftJoinAndSelect('doctorUser.avatar', 'doctorAvatar')
      .leftJoinAndSelect('prescription.client', 'client')
      .leftJoinAndSelect('client.user', 'clientUser')
      .leftJoinAndSelect('clientUser.avatar', 'clientAvatar')
      .orderBy('prescription.code', 'DESC')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return founds.map((prescription: Prescription) =>
      this.serializePrescription(prescription),
    );
  }

  serializePrescription(prescription: Prescription): PrescriptionDto {
    return {
      id: prescription?.id,
      code: prescription?.code,
      recommendations: prescription.recommendations,
      waist: prescription.waist,
      weight: prescription.weight,
      height: prescription.height,
      pressure: prescription.pressure,
      bpm: prescription.bpm,

      exams: prescription.exams,
      medicines: prescription.medicines,
      createdAt: prescription.createdAt,
      client: {
        id: prescription.client.id,
        user: {
          username: prescription.client.user.username,
          fullname: prescription.client.user.fullname,
          surname: prescription.client.user.surname,
          avatar: {
            url: prescription.client.user.avatar?.url,
          },
        },
      },
      doctor: {
        id: prescription.doctor.id,
        user: {
          username: prescription.doctor.user.username,
          fullname: prescription.doctor.user.fullname,
          surname: prescription.doctor.user.surname,
          avatar: {
            url: prescription.doctor.user.avatar?.url,
          },
        },
      },
    };
  }

  async updateOne(
    id: string,
    prescriptionId: string,
    body: PrescriptionDto,
  ): Promise<void> {
    const prescription = await this.getOne(id, prescriptionId);

    if (prescription.doctor.id !== id) {
      throw new UnauthorizedException('Not allowed');
    }

    const prescriptionUpdated = await Prescription.findOne(prescriptionId);

    Prescription.merge(prescriptionUpdated, body);

    try {
      await prescriptionUpdated.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail to update prescription');
    }
  }

  async delete(id: string): Promise<void> {
    const prescription = await Prescription.findOne(id);

    if (prescription.medicines.length > 0) {
      throw new BadRequestException(
        'Prescriptions has active medicine request',
      );
    }

    const notCanceledExams = prescription.exams.filter(
      exam => exam.status !== ExamStatus.CANCELED,
    );

    if (notCanceledExams.length > 0) {
      throw new BadRequestException('Prescriptions has active exam request');
    }

    try {
      await Prescription.getRepository().softDelete(id);
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Fail at delete prescription');
    }
  }
}
