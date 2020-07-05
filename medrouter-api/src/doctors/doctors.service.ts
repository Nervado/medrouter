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
import { getMidnight } from 'src/utils/getMidnight';
import { Appointment } from 'src/appointments/models/appointment.entity';
import { Available } from './enums/available.enum';
import { doc } from 'prettier';
import { SearchAppointment } from 'src/appointments/dto/search-appointment.dto';
import { AppointmentDto } from 'src/appointments/dto/appointment.dto';
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

  async getAll(user: User, search: SearchFilterDto): Promise<DoctorDto[]> {
    if (this.checkRole(user, Role.OWNER)) {
      return await this.repo.getAll(search);
    }

    if (
      this.checkRole(user, Role.RECEPT) ||
      this.checkRole(user, Role.CLIENT)
    ) {
      const results = await this.repo.getAll(search);
      const doctors: DoctorDto[] = [
        ...results.map((doctor: Doctor) => {
          return {
            id: doctor.id,
            specialty: doctor.specialty,
            user: {
              username: doctor.user.username,
              surname: doctor.user.surname,
              avatar: {
                avatarId: doctor.user.avatar.avatarId,
              },
            },
          };
        }),
      ];

      return doctors;
    }
  }

  checkRole(user: User, role: Role): boolean {
    return user.role.find(rol => rol === role) ? true : false;
  }

  async createSchedule(
    schedules: Schedules,
    id: string,
    user: User,
  ): Promise<void> {
    const doctor = await this.repo.getById(id);

    this.checkDoctor(doctor, user);

    const found = await this.checkIfSchedulesExists(
      id,
      schedules.schedules[0].date,
    );

    if (found) {
      throw new BadRequestException('Schedule alredy exists!');
    }

    // if no, create a schedule for each given date
    let newSchedules = [];

    const now = new Date();

    schedules.schedules.forEach(async schedule => {
      if (schedule?.date?.getTime() > now.getTime()) {
        const newSchedule = new Schedule();

        newSchedule.date = new Date(
          new Date(schedule.date).setHours(0, 0, 0, 0),
        );

        newSchedule.availablehours = [...schedule.availablehours];

        newSchedule.doctor = doctor;

        try {
          await newSchedule.save();
          newSchedules = [newSchedule, ...newSchedules];
        } catch (error) {
          throw new InternalServerErrorException('Fail to create schedule');
        }
      }
    });
  }

  async checkIfSchedulesExists(id: string, date: Date): Promise<Schedule> {
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
    try {
      const founds = await this.searchMany(id, search);

      const searchAppointments = await this.as.searchMany(id, search);

      const schedules = [
        ...founds.map(sc => {
          const hours = sc.availablehours.map(hour => {
            const find = searchAppointments.find(
              appointment =>
                appointment.hour === hour &&
                sc.date.toString() === appointment.date.toString(),
            );

            console.log(find);

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
    } catch (error) {
      throw new InternalServerErrorException('Fail to retrive schedule');
    }
  }

  async updateSchedules(
    schedules: Schedules,
    id: string,
    user: User,
  ): Promise<void> {
    const doctor = await this.repo.getById(id);

    this.checkDoctor(doctor, user);

    return await this.saveSchedules(id, schedules.schedules);
  }

  async saveSchedules(id: string, schedules: ScheduleDto[]): Promise<void> {
    if (schedules) {
      schedules.forEach(
        async schedule => await this.updateSchedule(id, schedule),
      );
    }
  }

  async updateSchedule(id: string, schedule: ScheduleDto): Promise<boolean> {
    const scheduleToUpdate = await Schedule.findOne({
      where: { id: schedule.id },
    });

    const appointmentsScheduled = await this.as.searchMany(id, {
      date: scheduleToUpdate.date,
    });

    // this hours could no be removed
    const hoursTokeep = appointmentsScheduled.map(app => app.hour);
    const hoursToAddOrRemove = schedule.availablehours;

    scheduleToUpdate.availablehours = [
      ...new Set([...hoursTokeep, ...hoursToAddOrRemove]),
    ];

    try {
      const now = getMidnight(new Date());

      if (scheduleToUpdate.date.getTime() >= now.getTime()) {
        await scheduleToUpdate.save();
      }
    } catch (error) {
      throw new InternalServerErrorException('Update schedule failure');
    }

    return hoursTokeep.length > 1 ? false : true;
  }

  checkDoctor(doctor: Doctor, user: User): void {
    if (!doctor) {
      throw new BadRequestException('Doctor dont exists!');
    }

    if (doctor.user.userId !== user.userId) {
      throw new UnauthorizedException('You dont have permission!');
    }
  }

  // query methods
  async searchMany(
    id?: string,
    search?: SearchScheduleDto,
  ): Promise<Schedule[]> {
    const query = Schedule.createQueryBuilder('schedule');
    const { username, date, endDate } = search;

    if (id) {
      query.andWhere(`doctor.id = :id`, { id });
    }

    if (username) {
      query.andWhere(`user.username ILIKE '%${username}%'`);
    }

    if (endDate) {
      query.andWhere('date >= :date', { date: getMidnight(date) });
      query.andWhere('date <= :endDate', {
        endDate: getMidnight(endDate),
      });
    } else {
      query.andWhere('date = :date', { date: getMidnight(date) });
    }

    return await query
      .leftJoinAndSelect('schedule.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'user')
      .orderBy('date', 'ASC')
      .getMany();
  }

  async getOne(userId: any, user?: User): Promise<Doctor> {
    if (parseInt(userId) !== user.userId) {
      throw new UnauthorizedException('Not Allowed');
    }

    const query = this.repo.createQueryBuilder('doctor');

    query.andWhere('user.userId = :userId', { userId });

    return await query.leftJoinAndSelect('doctor.user', 'user').getOne();
  }

  async findOne(id: string): Promise<Doctor> {
    const doctor: Doctor = await this.repo.findOne({ where: { id } });

    if (!doctor) {
      throw new BadRequestException('Doctor dont exists!');
    }

    return doctor;
  }

  async getAppointments(
    id: string,
    search: SearchAppointment,
    user: User,
  ): Promise<AppointmentDto[]> {
    const doctor = await this.repo.findOne(id);

    if (user.userId !== doctor.user.userId) {
      throw new UnauthorizedException('Not allowed!');
    }

    return await this.as.getAll({
      id: doctor.id,
      date: search.date,
      clientname: search.clientname,
    });
  }
}
