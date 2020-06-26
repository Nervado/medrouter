import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
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
import { ScheduleDto, Schedules } from './dto/schedule.dto';
import { Schedule } from './models/schedule.entity';
import { SearchScheduleDto } from './dto/searchSchedule.dto';
import { throwError } from 'rxjs';
import { AppointmentsService } from 'src/appointments/appointments.service';
@Injectable()
export class DoctorsService extends Service<
  DoctorDto,
  Doctor,
  DoctorRepository,
  any,
  User,
  string
> {
  constructor(
    @InjectRepository(DoctorRepository) repo: DoctorRepository,
    private usersService: UsersService,
    private as: AppointmentsService,
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
    id: string,
    body: DoctorDto,
    operation: string,
  ): Promise<Doctor> {
    return await this.repo.updateOne(id, body, operation);
  }

  async delete(id: string) {
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

  async createSchedule(
    schedules: Schedules,
    id: string,
    user: User,
  ): Promise<Schedule[]> {
    const doctor = await this.repo.getById(id);

    if (!doctor) {
      throw new BadRequestException('Doctor dont exists!');
    }

    if (doctor.user.userId !== user.userId) {
      throw new UnauthorizedException('You dont have permission!');
    }

    const found = await this.checkIfSchedulesExists(
      id,
      schedules.schedules[0].date,
    );

    if (found) {
      throw new BadRequestException('Schedule alredy exists!');
    }

    // if no, create a schedule for each given date
    const newSchedules = [];

    schedules.schedules.forEach(async schedule => {
      const newSchedule = new Schedule();

      newSchedule.date = new Date(new Date(schedule.date).setHours(0, 0, 0, 0));

      newSchedule.availablehours = [...schedule.availablehours];

      newSchedule.doctor = doctor;

      try {
        await newSchedule.save();
        newSchedules.push(newSchedule);
      } catch (error) {
        throw new InternalServerErrorException('Fail to create schedule');
      }
    });

    return newSchedules;
  }

  async checkIfSchedulesExists(id: string, date: Date): Promise<any> {
    const datesearch = new Date(new Date(date).setHours(0, 0, 0, 0));

    const query = Schedule.createQueryBuilder('schedule');

    query.andWhere('doctor.id = :id', { id });
    query.andWhere('date = :date', { date: datesearch });

    const schedule = await query
      .leftJoinAndSelect('schedule.doctor', 'doctor')
      .getOne();

    return schedule;
  }

  async getSchedules(
    id?: string,
    search?: SearchScheduleDto,
  ): Promise<ScheduleDto[]> {
    const query = Schedule.createQueryBuilder('schedule');

    const { username, date, page, endDate } = search;

    const pageNumber: number = page ? page * 7 - 7 : 0;

    if (id) {
      query.andWhere(`doctor.id = :id`, { id });
    }

    if (username) {
      query.andWhere(`user.username ILIKE '%${username}%'`);
    }

    if (endDate) {
      query.andWhere('date >= :date', { date });
      query.andWhere('date < :date', { date: endDate });
    } else {
      query.andWhere(`date = :date`, { date });
    }

    const founds = await query
      .leftJoinAndSelect('schedule.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'user')
      .skip(pageNumber)
      .take(7)
      .getMany();

    const schedules = [
      ...founds.map(sc => {
        const hours = sc.availablehours.map(hour => {
          const find = this.as.searchOne({
            doctorId: id,
            hour: hour,
            date: sc.date,
          });
          return { hour: hour, busy: find ? true : false };
        });

        return {
          id: sc.id,
          date: sc.date,
          hours,
        };
      }),
    ];

    return schedules;
  }

  async getOne(userId: any, user?: User): Promise<Doctor> {
    if (parseInt(userId) !== user.userId) {
      throw new UnauthorizedException('Not Allowed');
    }

    const query = this.repo.createQueryBuilder('doctor');

    query.andWhere('user.userId = :userId', { userId });

    return await query.leftJoinAndSelect('doctor.user', 'user').getOne();
  }
}
