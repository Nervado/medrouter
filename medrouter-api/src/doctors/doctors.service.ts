import { Injectable, BadRequestException } from '@nestjs/common';
import { Service } from '../utils/generics.service';
import { DoctorRepository } from './doctor.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor } from './models/doctor.entity';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class DoctorsService extends Service<
  DoctorDto,
  Doctor,
  DoctorRepository,
  number,
  User
> {
  constructor(
    @InjectRepository(DoctorRepository) repo: DoctorRepository,
    private usersService: UsersService,
  ) {
    super(repo);
  }
  public async create(body: DoctorDto): Promise<Doctor> {
    const user = await this.usersService.findOne(body.user.email);
    if (user.doctor) {
      throw new BadRequestException('Doctor already exists!');
    }
    user.doctor = true;
    return this.createOne(body, user);
  }
}
