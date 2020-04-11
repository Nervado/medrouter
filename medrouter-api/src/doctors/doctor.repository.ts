import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
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
    console.log(specialty);

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

  async updateOne(id: any, body: any): Promise<Doctor> {
    const doctor = await this.findOne(id);
    this.merge(doctor, body);
    return await this.save(doctor);
  }

  async getById(id: number) {
    return this.findOne(id);
  }

  async deleteOne(id: number) {
    this.deleteOne(id);
  }
}
