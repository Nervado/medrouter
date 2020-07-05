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
import { getMidnight } from 'src/utils/getMidnight';
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
    return await Appointment.findOne({ where: { id } });
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
      doctor.id,
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
    doctorId: string,
    clientId: string,
    hour: Available,
    date: Date,
  ): Promise<Appointment> {
    const query = Appointment.createQueryBuilder('appointment');

    query.andWhere('doctor.id = :doctorId', { doctorId });
    query.andWhere('client.id = :clientId', { clientId });
    query.andWhere('status != :status', { status: AppointmentStatus.CANCELED });

    const results = await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.client', 'client')
      .getOne();

    const query2 = Appointment.createQueryBuilder('appointment');
    query2.andWhere('hour = :hour', { hour });
    query2.andWhere('date = :date', { date: getMidnight(date) });
    query2.andWhere('client.id = :clientId', { clientId });
    query2.andWhere('status != :status', {
      status: AppointmentStatus.CANCELED,
    });

    const results1 = await query2
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.client', 'client')
      .getOne();

    return results ? results : results1;
  }

  async getAll(search: SearchAppointment): Promise<AppointmentDto[]> {
    const query = Appointment.createQueryBuilder('appointment');

    if (search.date) {
      query.andWhere('date = :date', { date: getMidnight(search.date) });
    }

    if (search.username) {
      query.andWhere(`doctorUser.username ILIKE '%${search.username}%'`);
    }

    if (search.id) {
      query.andWhere('doctor.id = :id', { id: search.id });
    }

    if (search.hour) {
      query.andWhere('hour = :hour', { hour: search.hour });
    }

    //query.andWhere('status != :status', { status: AppointmentStatus.CANCELED });

    const resuts = await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'doctorUser')
      .leftJoinAndSelect('doctorUser.avatar', 'doctorAvatar')
      .leftJoinAndSelect('appointment.client', 'client')
      .leftJoinAndSelect('client.user', 'clientUser')
      .leftJoinAndSelect('clientUser.avatar', 'clientAvatar')
      .getMany();

    const appoiments: AppointmentDto[] = [
      ...resuts.map((app: Appointment) => {
        return {
          id: app.id,
          client: {
            id: app.client.id,
            user: {
              username: app.client.user.username,
              fullname: app.client.user.fullname,
              surname: app.client.user.surname,
              avatar: {
                url: app.client.user.avatar?.url,
              },
            },
          },
          doctor: {
            id: app.doctor.id,
            specialty: app.doctor.specialty,
            user: {
              username: app.doctor.user.username,
              fullname: app.doctor.user.fullname,
              surname: app.doctor.user.surname,
              avatar: {
                url: app.doctor.user.avatar?.url,
              },
            },
          },
          date: app.date,
          hour: app.hour,
          status: app.status,
        };
      }),
    ];

    return appoiments;
  }

  async modifyOne(id: string, update: UpdateAppointmentDto): Promise<void> {
    const { status, date, hour } = update;

    const appointment = await Appointment.findOne(id);

    if (!appointment) {
      throw new NotFoundException('Not found');
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
      const search = await this.checkIfClientHasAppointment(
        appointment.doctor.id,
        appointment.client.id,
        update.hour,
        update.date,
      );

      if (search) {
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
    return await Appointment.delete(id);
  }
}
