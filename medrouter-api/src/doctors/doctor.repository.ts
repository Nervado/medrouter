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
import { Role } from 'src/auth/enums/role.enum';

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

    if (operation === 'status' && body === 're-hired' && !doctor.ishired) {
      doctor.ishired = true;
      //doctor.user.doctor = true; // update all privilleges
      doctor.dismissdate = null;
      doctor.hireddate = new Date();
      doctor.user.role = [Role.DOCTOR, Role.CLIENT];

      try {
        return await this.save(doctor);
      } catch (error) {
        throw new BadRequestException('Operation fail', error);
      }
    }

    if (operation === 'status' && body === 'dismiss' && doctor.ishired) {
      doctor.ishired = false;
      doctor.salary = 0;
      //doctor.user.doctor = false; // remove all privilleges
      doctor.dismissdate = new Date();
      doctor.user.role = [Role.CLIENT];

      try {
        return await this.save(doctor);
      } catch (error) {
        throw new BadRequestException('Operation fail', error);
      }
    }

    if (operation === 'diff' && doctor.ishired) {
      try {
        await this.createQueryBuilder()
          .update(Doctor)
          .set({ salary: () => `salary + ${body}` })
          .where({ id })
          .execute();

        return await this.findOne(id);
      } catch (error) {
        throw new BadRequestException('Operation fail', operation);
      }
    }
    if (operation !== 'diff' && operation !== 'status' && doctor.ishired) {
      doctor.specialty = body;

      try {
        return await this.save(doctor);
      } catch (error) {
        throw new BadRequestException('Operation fail', error);
      }
    }
  }
}
