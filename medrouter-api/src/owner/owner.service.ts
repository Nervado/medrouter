import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Owner } from './models/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerRepository } from './owner.repository';
import { OwnerDto } from './dtos/owner-dto';
import { Service } from 'src/utils/generics.service';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/auth/enums/role.enum';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';
import { TotalDto } from './dtos/total.dto';
import { Client } from 'src/client/models/client.entity';
import { Doctor } from 'src/doctors/models/doctor.entity';
import { Manager } from 'src/manager/models/manager.entity';
import { Receptionist } from 'src/receptionist/models/receptionist.entity';
import { Appointment } from 'src/appointments/models/appointment.entity';
import { AppointmentStatus } from 'src/appointments/enums/appointment.enum';

@Injectable()
export class OwnerService extends Service<
  OwnerDto,
  Owner,
  OwnerRepository,
  any,
  User,
  string
> {
  constructor(
    @InjectRepository(OwnerRepository) repo: OwnerRepository,
    private usersService: UsersService,
  ) {
    super(repo);
  }

  public async create(body: OwnerDto): Promise<Owner> {
    const user = await this.usersService.findOne(body.user.email);

    if (user.role.find(rol => rol === Role.OWNER)) {
      throw new BadRequestException('owner already exists!');
    }

    user.role = [...user.role, Role.OWNER];
    return await this.createOne(body, user);
  }

  public async getAll(search: SearchFilterDto): Promise<Owner[]> {
    return await this.repo.getAll(search);
  }

  async delete(id: string) {
    const owner = await this.getOne(id);
    try {
      await this.usersService.resetRole(owner.user.userId);
      return this.repo.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException('Fail operation:delete');
    }
  }

  async getOne(userId: string, user?: User): Promise<Owner> {
    if (userId !== user.userId) {
      throw new UnauthorizedException('Not Allowed');
    }

    const query = this.repo.createQueryBuilder('owner');

    query.andWhere('user.userId = :userId', { userId });

    return await query.leftJoinAndSelect('owner.user', 'user').getOne();
  }

  async getTotalizers(id: string, user: User): Promise<TotalDto> {
    const owner = await Owner.findOne(id);

    if (!owner || owner.user.userId !== user.userId) {
      throw new BadRequestException('Operation not allowed for current user');
    }

    try {
      const clients = await Client.count();

      const doctors = await Doctor.count();

      const managers = await Manager.count();

      const owners = await this.repo.count();

      const staff = await Receptionist.count();

      let { budget } = await Appointment.createQueryBuilder('appointment')
        .andWhere(' status = :status', { status: AppointmentStatus.ATTENDED })
        .select('SUM(appointment.price)', 'budget')
        .getRawOne();

      console.log(budget);

      return {
        clients,
        staff: managers + owners + staff,
        doctors,
        budget: budget || 0,
      };
    } catch (error) {
      throw new InternalServerErrorException('Fail at colect data');
    }
  }
}
