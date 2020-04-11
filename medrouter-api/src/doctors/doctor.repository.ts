import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { Doctor } from './models/doctor.entity';
import { User } from 'src/users/models/user.entity';
import { DoctorDto } from './dto/doctor.dto';
import { RepositoryInterface } from '../utils/base-repository.interface';

@EntityRepository(Doctor)
export class DoctorRepository extends Repository<Doctor>
  implements RepositoryInterface<Doctor, number, DoctorDto, User, string> {
  async createOne(doctorDto: DoctorDto, user: User): Promise<Doctor> {
    const doctor = new Doctor();

    const { salary, specialty } = doctorDto;
    if (!salary || !specialty) {
      throw new BadRequestException('Salary or Specialty not provide');
    }

    doctor.ishired = true;
    doctor.hireddate = new Date();
    doctor.salary = salary;

    doctor.specialty = [...specialty];

    doctor.user = user;

    console.log(doctor.specialty);

    this.merge(doctor, doctorDto);

    try {
      return await doctor.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('doctor already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException('Uknow error!');
      }
    }
  }

  async index(page: number): Promise<Doctor[]> {
    const pageNumber: number = page * 5 - 5;
    const doctors = await this.createQueryBuilder('doctor')
      .leftJoinAndSelect('doctor.user', 'user')
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(5)
      .getMany();

    return doctors;
  }

  async getById(id: number) {
    return this.findOne(id);
  }

  async deleteOne(id: number) {
    this.deleteOne(id);
  }

  async updateOne(id: any, body: any, operation?: string): Promise<Doctor> {
    const doctor = await this.findOne({ id });

    if (operation === 'status' && body === 're-hired') {
      try {
        doctor.ishired = true;
        doctor.user.admin = true; // update all privilleges
        doctor.dismissdate = null;
        doctor.hireddate = new Date();

        await this.save(doctor);
        return doctor;
      } catch (error) {
        throw new BadRequestException(
          'Erro em operacao',
          'operation: re-hired',
        );
      }
    }

    if (operation === 'status' && body === 'dismiss') {
      try {
        doctor.ishired = false;
        doctor.salary = 0;
        doctor.user.admin = false;
        doctor.dismissdate = new Date();
        return await this.save(doctor);
      } catch (error) {
        throw new BadRequestException('Erro em operacao', error);
      }
    }

    if (operation === 'diff') {
      await this.createQueryBuilder()
        .update(Doctor)
        .set({ salary: () => `salary + ${body}` })
        .where({ id })
        .execute();

      return await this.findOne(id);
    }

    if (operation !== 'diff' && operation !== 'status') {
      const { specialty } = body;
      doctor.specialty = [...specialty];
      this.merge(doctor, body);

      try {
        return await this.save(doctor);
      } catch (error) {
        throw new InternalServerErrorException('Unable to update');
      }
    }
  }
}
