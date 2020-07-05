import {
  Injectable,
  Inject,
  forwardRef,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Appointment } from './models/appointment.entity';
import { SearchAppointment } from './dto/search-appointment.dto';
import { getMidnight, isPast } from 'src/utils/getMidnight';
import { AppointmentDto } from './dto/appointment.dto';
import { DoctorsService } from 'src/doctors/doctors.service';
import { ClientService } from 'src/client/client.service';
import { AppointmentStatus } from './enums/appointment.enum';
import { UpdateAppointmentDto } from './dto/update-appointment';
import { Available } from 'src/doctors/enums/available.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    private cs: ClientService,
    @Inject(forwardRef(() => DoctorsService)) private ds: DoctorsService,
  ) {}

  async getOne(id: string): Promise<AppointmentDto> {
    const query = Appointment.createQueryBuilder('appointment');

    query.andWhere('appointment.id = :id', { id });

    const find = await query

      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'doctorUser')
      .leftJoinAndSelect('doctorUser.avatar', 'doctorAvatar')
      .leftJoinAndSelect('appointment.client', 'client')
      .leftJoinAndSelect('client.user', 'clientUser')
      .leftJoinAndSelect('clientUser.avatar', 'clientAvatar')
      .getOne();

    return this.serializeAppointment(find);
  }

  async searchOne(search: SearchAppointment): Promise<Appointment> {
    const query = Appointment.createQueryBuilder('appointment');

    const { id, hour, date } = search;

    query.andWhere('doctor.id = :id', { id });
    query.andWhere('hour = :hour', { hour });
    query.andWhere('date = :date', { date: getMidnight(date) });
    query.andWhere('status != :status', { status: AppointmentStatus.CANCELED });

    return await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .getOne();
  }

  async searchMany(
    id: string,
    search: SearchAppointment,
  ): Promise<Appointment[]> {
    const query = Appointment.createQueryBuilder('appointment');

    const { date, endDate } = search;

    query.andWhere('doctor.id = :id', { id });
    query.andWhere('status != :status', { status: AppointmentStatus.CANCELED });

    if (endDate) {
      query.andWhere('date >= :date', { date: getMidnight(date) });
      query.andWhere('date <= :endDate', {
        endDate: getMidnight(endDate),
      });
    } else {
      query.andWhere('date = :date', { date: getMidnight(date) });
    }

    return await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .orderBy('date', 'ASC')
      .getMany();
  }

  async create(app: AppointmentDto): Promise<void> {
    const doctor = await this.ds.findOne(app.doctor.id);
    const client = await this.cs.findOne(app.client.id);

    const find = await this.checkIfClientHasAppointment(
      client.id,
      app.hour,
      app.date,
    );

    if (find) {
      throw new BadRequestException(
        'Client already has appointment on currently schedule',
      );
    }

    const search = await this.searchOne({
      id: doctor.id,
      date: app.date,
      hour: app.hour,
    });

    if (doctor.user.userId === client.user.userId) {
      throw new BadRequestException('Not allowed');
    }

    if (search) {
      throw new BadRequestException('Schedule already taken');
    }

    const schedule = await this.ds.checkIfSchedulesExists(doctor.id, app.date);

    const hour = schedule.availablehours.find(hour => hour === app.hour);

    if (!hour) {
      throw new BadRequestException('Schedule not available');
    }

    const appointment = new Appointment();

    if (client.user.checked) {
      appointment.status = AppointmentStatus.ONESCHEDULE;
    }

    Appointment.merge(appointment, {
      doctor,
      client,
      date: getMidnight(app.date),
      hour: app.hour,
    });

    try {
      await appointment.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail to create appointment');
    }
  }

  async checkIfClientHasAppointment(
    clientId: string,
    hour: Available,
    date: Date,
  ): Promise<Appointment> {
    const query = Appointment.createQueryBuilder('appointment');
    query.andWhere('hour = :hour', { hour });
    query.andWhere('date = :date', { date: getMidnight(date) });
    query.andWhere('client.id = :clientId', { clientId });
    query.andWhere('status != :cancel AND status != :attend', {
      cancel: AppointmentStatus.CANCELED,
      attend: AppointmentStatus.ATTENDED,
    });

    const results1 = await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.client', 'client')
      .getOne();

    return results1;
  }

  async checkIfClientHasAnotherAppointment(
    doctorId: string,
    clientId: string,
  ): Promise<Appointment[]> {
    const query = Appointment.createQueryBuilder('appointment');

    query.andWhere('doctor.id = :doctorId', { doctorId });
    query.andWhere('client.id = :clientId', { clientId });
    query.andWhere('status != :cancel AND status != :attend', {
      cancel: AppointmentStatus.CANCELED,
      attend: AppointmentStatus.ATTENDED,
    });

    const results = await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.client', 'client')
      .getMany();

    return results;
  }

  async getAll(search: SearchAppointment): Promise<AppointmentDto[]> {
    const query = Appointment.createQueryBuilder('appointment');

    if (search.date) {
      query.andWhere('date = :date', { date: getMidnight(search.date) });
    }

    if (search.username) {
      query.andWhere(`doctorUser.username ILIKE '%${search.username}%'`);
    }

    if (search.clientname) {
      query.andWhere(`clientUser.username ILIKE '%${search.clientname}%'`);
    }

    if (search.id) {
      query.andWhere('doctor.id = :id', { id: search.id });
    }

    if (search.hour) {
      query.andWhere('hour = :hour', { hour: search.hour });
    }

    //query.andWhere('status != :status', { status: AppointmentStatus.CANCELED });

    try {
      const resuts = await query
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('doctor.user', 'doctorUser')
        .leftJoinAndSelect('doctorUser.avatar', 'doctorAvatar')
        .leftJoinAndSelect('appointment.client', 'client')
        .leftJoinAndSelect('client.user', 'clientUser')
        .leftJoinAndSelect('clientUser.avatar', 'clientAvatar')
        .getMany();

      const appoiments: AppointmentDto[] = [
        ...resuts.map((app: Appointment) => this.serializeAppointment(app)),
      ];

      return appoiments;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async modifyOne(id: string, update: UpdateAppointmentDto): Promise<void> {
    const { status, date, hour } = update;

    const appointment = await Appointment.createQueryBuilder('appointment')
      .andWhere('appointment.id = :id', { id })
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.client', 'client')
      .getOne();

    if (!appointment) {
      throw new NotFoundException('Not found');
    }

    //schedule not in past
    if (
      status === AppointmentStatus.RESCHEDULED &&
      isPast(update.date, update.hour)
    ) {
      throw new BadRequestException('Time travel is forbidden =(');
    }

    if (
      status === AppointmentStatus.CANCELED &&
      appointment.status !== AppointmentStatus.CANCELED &&
      appointment.status !== AppointmentStatus.ATTENDED
    ) {
      appointment.status = AppointmentStatus.CANCELED;
    }

    if (
      status === AppointmentStatus.ONESCHEDULE &&
      appointment.status === AppointmentStatus.REQUESTED
    ) {
      appointment.status = AppointmentStatus.ONESCHEDULE;
    }

    if (
      status === AppointmentStatus.RESCHEDULED &&
      (appointment.status === AppointmentStatus.ONESCHEDULE ||
        appointment.status === AppointmentStatus.RESCHEDULED)
    ) {
      // check if client has appointment in this hour or another active apppointment with same doctor
      const search1 = await this.checkIfClientHasAppointment(
        appointment.client.id,
        update.hour,
        update.date,
      );

      const search2 = await this.checkIfClientHasAnotherAppointment(
        appointment.doctor.id,
        appointment.client.id,
      );

      if (search1 || search2.length > 1) {
        throw new BadRequestException('Client has conflict schedule');
      }

      // check if schedules exists
      const schedule = await this.ds.checkIfSchedulesExists(
        appointment.doctor.id,
        update.date,
      );

      if (!schedule.availablehours.find(hour => update.hour === hour)) {
        throw new BadRequestException('Schedule  not available');
      }

      // check if schedule is taken
      const find = await this.getAll({
        id: appointment.doctor.id,
        date: update.date,
        hour: update.hour,
      });

      if (find?.length > 0) {
        throw new BadRequestException('Schedule time has alredy taken');
      }

      appointment.status = AppointmentStatus.RESCHEDULED;
      appointment.date = date;
      appointment.hour = hour;
    }

    try {
      await appointment.save();
    } catch (error) {
      throw new InternalServerErrorException('Update appointment has fail');
    }
  }

  async delete(id: string): Promise<any> {
    return await Appointment.getRepository().softDelete(id);
  }

  serializeAppointment(appointment: Appointment): AppointmentDto {
    return {
      id: appointment.id,
      client: {
        id: appointment.client.id,
        user: {
          username: appointment.client.user.username,
          fullname: appointment.client.user.fullname,
          surname: appointment.client.user.surname,
          avatar: {
            url: appointment.client.user.avatar?.url,
          },
        },
      },
      doctor: {
        id: appointment.doctor.id,
        specialty: appointment.doctor.specialty,
        user: {
          username: appointment.doctor.user.username,
          fullname: appointment.doctor.user.fullname,
          surname: appointment.doctor.user.surname,
          avatar: {
            url: appointment.doctor.user.avatar?.url,
          },
        },
      },
      date: appointment.date,
      hour: appointment.hour,
      status: appointment.status,
    };
  }
}
