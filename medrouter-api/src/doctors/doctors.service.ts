import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Service } from '../utils/generics.service';
import { DoctorRepository } from './doctor.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor } from './models/doctor.entity';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/auth/enums/role.enum';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';
@Injectable()
export class DoctorsService extends Service<
  DoctorDto,
  Doctor,
  DoctorRepository,
  number,
  User,
  string
> {
  constructor(
    @InjectRepository(DoctorRepository) repo: DoctorRepository,
    private usersService: UsersService,
  ) {
    super(repo);
  }
  public async create(body: DoctorDto): Promise<Doctor> {
    const user = await this.usersService.findOne(body.user.email);

    if (user.role.find(rol => rol === Role.DOCTOR)) {
      throw new BadRequestException('Doctor already exists!');
    }

    user.role = [...user.role, Role.DOCTOR];
    return await this.createOne(body, user);
  }

  async modifyOne(
    id: number,
    body: DoctorDto,
    operation: string,
  ): Promise<Doctor> {
    return await this.repo.updateOne(id, body, operation);
  }

  async delete(id: number) {
    const doctor = await this.getOne(id);
    try {
      await this.usersService.resetRole(doctor.user.userId);
      return this.repo.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException('Fail operation:delete');
    }
  }

  getAll(search: SearchFilterDto): Promise<Doctor[]> {
    return this.repo.getAll(search);
  }
}
