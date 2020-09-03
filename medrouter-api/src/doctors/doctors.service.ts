import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
  Inject,
  forwardRef,
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

import { AppointmentsService } from 'src/appointments/appointments.service';
import { getMidnight } from 'src/utils/getMidnight';

import { SearchAppointment } from 'src/appointments/dto/search-appointment.dto';
import { AppointmentDto } from 'src/appointments/dto/appointment.dto';

import { SearchResultDto } from 'src/client/dtos/search-result-dto';
import { ClientService } from 'src/client/client.service';
import { SearchClientDto } from 'src/client/dtos/search-client-dto';
import { PrescriptionDto } from 'src/prescriptions/dto/prescription.dto';
import { PrescriptionsService } from 'src/prescriptions/prescriptions.service';
import { ExamDto } from 'src/exams/dto/exam.dto';
import { ExamsService } from 'src/exams/exams.service';

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
    @Inject(forwardRef(() => AppointmentsService))
    private as: AppointmentsService,
    private cs: ClientService,
    private ps: PrescriptionsService,
    private es: ExamsService,
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
              fullname: doctor.user.fullname,
              avatar: {
                url: doctor.user.avatar?.url,
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
      schedules.schedules[6].date,
    );

    if (found) {
      throw new BadRequestException('Schedule alredy exists!');
    }

    // if no, create a schedule for each given date

    const now = new Date();

    schedules.schedules.forEach(async schedule => {
      if (new Date(schedule?.date).getTime() > getMidnight(now).getTime()) {
        const newSchedule = new Schedule();

        newSchedule.date = new Date(
          new Date(schedule.date).setHours(0, 0, 0, 0),
        );

        newSchedule.availablehours = [...schedule.availablehours];

        newSchedule.doctor = doctor;

        try {
          await newSchedule.save();
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

  async getFreeSchedules(
    id?: string,
    search?: SearchScheduleDto,
  ): Promise<ScheduleDto> {
    try {
      const founds = await this.searchMany(id, search);

      const searchAppointments = await this.as.searchMany(id, search);

      const schedules = [
        ...founds.map(sc => {
          const hours = sc.availablehours
            .map(hour => {
              const find = searchAppointments.find(
                appointment =>
                  appointment.hour === hour &&
                  sc.date.toString() === appointment.date.toString(),
              );

              return { hour: hour, busy: find ? true : false };
            })
            .filter(sc => sc.busy === false);

          return {
            id: sc.id,
            date: sc.date,
            hours,
          };
        }),
      ];

      return schedules[0];
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

    if (!scheduleToUpdate) {
      return false;
    }

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

  async getClients(
    id: string,
    search: SearchClientDto,
    user: User,
  ): Promise<SearchResultDto[]> {
    const doctor = await this.repo.findOne(id);

    this.checkDoctor(doctor, user);

    return await this.cs.getClientsWithActiveAppointments(search);
  }
  async getAppointment(id, apptId, user): Promise<AppointmentDto> {
    const doctor = await this.repo.findOne(id);

    this.checkDoctor(doctor, user);

    const find = await this.as.getOne(apptId);

    return find;
  }

  async createPrescription(
    id: string,
    body: PrescriptionDto,
    user: User,
  ): Promise<{ id: string }> {
    const doctor = await this.repo.findOne(id);

    const client = await this.cs.findOne(body.client.id);

    this.checkDoctor(doctor, user);

    this.checkIfHaveActiveAppointment(doctor.id, client.id);

    return {
      id: await this.ps.createOne(doctor, client),
    };
  }

  async findPrescriptions(
    id: string,
    search: SearchClientDto,
    user: User,
  ): Promise<PrescriptionDto[]> {
    const doctor = await this.repo.findOne(id);

    this.checkDoctor(doctor, user);

    return await this.ps.getAll(id, search);
  }

  async getPrescription(
    id: string,
    prescriptionId: string,
    user: User,
  ): Promise<PrescriptionDto> {
    const doctor = await this.repo.findOne(id);

    this.checkDoctor(doctor, user);

    return await this.ps.getOne(id, prescriptionId);
  }

  async updatePrescription(
    id: string,
    prescriptionId: string,
    user: User,
    body: PrescriptionDto,
  ): Promise<void> {
    const doctor = await this.repo.findOne(id);

    this.checkDoctor(doctor, user);

    this.checkIfHaveActiveAppointment(id, body.client.id);

    return await this.ps.updateOne(id, prescriptionId, body);
  }

  async checkIfHaveActiveAppointment(
    doctorId: string,
    clientId: string,
  ): Promise<void | Error> {
    const hasAppointments = await this.as.checkIfClientHasAnotherAppointment(
      doctorId,
      clientId,
    );

    if (hasAppointments.length === 0) {
      throw new BadRequestException('Client have not active schedule');
    }
  }

  async deletePrescription(
    id: string,
    prescriptionId: string,
    user: User,
  ): Promise<void> {
    // check docktor
    const doctor = await this.repo.findOne(id);

    this.checkDoctor(doctor, user);

    return this.ps.delete(prescriptionId);
  }

  async findExams(
    id: string,
    search: SearchClientDto,
    user: User,
  ): Promise<ExamDto[]> {
    const doctor = await this.repo.findOne(id);

    this.checkDoctor(doctor, user);

    return this.es.getAll(id, search);
  }

  async changeExamStatus(id, examId, user): Promise<void> {
    const doctor = await this.repo.findOne(id);

    this.checkDoctor(doctor, user);

    return this.es.change(examId);
  }

  async getAvailableSchedules(search: SearchClientDto): Promise<ScheduleDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = Schedule.getRepository().createQueryBuilder('schedule');

    if (username) {
      query.andWhere(`user.username ILIKE '%${username}%' OR `);
    }

    const founds = await query
      .leftJoinAndSelect('schedule.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'user')
      .skip(pageNumber)
      .take(10)
      .orderBy('date', 'ASC')
      .getMany();

    return founds.map(sc => this.serializeSchedules(sc));
  }
  serializeSchedules(schedule: Schedule): ScheduleDto {
    return {
      id: schedule.id,
      date: schedule.date,
      availablehours: schedule.availablehours,

      doctor: {
        id: schedule.doctor.id,
        specialty: schedule.doctor.specialty,
        user: {
          username: schedule.doctor.user.username,
          fullname: schedule.doctor.user.fullname,
          surname: schedule.doctor.user.surname,
          avatar: {
            url: schedule.doctor.user.avatar.url,
          },
        },
      },
    };
  }
}
