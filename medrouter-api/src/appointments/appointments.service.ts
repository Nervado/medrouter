import {
  Injectable,
  Inject,
  forwardRef,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Appointment } from './models/appointment.entity';
import { SearchAppointment } from './dto/search-appointment.dto';
import { getMidnight } from 'src/utils/getMidnight';
import { AppointmentDto } from './dto/appointment.dto';
import { DoctorsService } from 'src/doctors/doctors.service';
import { ClientService } from 'src/client/client.service';
import { AppointmentStatus } from './enums/appointment.enum';

@Injectable()
export class AppointmentsService {
  constructor(
    private cs: ClientService,
    @Inject(forwardRef(() => DoctorsService)) private ds: DoctorsService,
  ) {}

  async getOne(id: string): Promise<Appointment> {
    return await Appointment.findOne({ where: { id } });
  }

  async searchOne(search: SearchAppointment): Promise<Appointment> {
    const query = Appointment.createQueryBuilder('appointment');

    const { id, hour, date } = search;

    query.andWhere('doctor.id = :id', { id });
    query.andWhere('hour = :hour', { hour });
    query.andWhere('date = :date', { date: getMidnight(date) });

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

    const find = await this.checkIfClientHasAppointment(doctor.id, client.id);

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
  ): Promise<Appointment> {
    const query = Appointment.createQueryBuilder('appointment');

    query.andWhere('doctor.id = :doctorId', { doctorId });
    query.andWhere('client.id = :clientId', { clientId });

    return await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('appointment.client', 'client')
      .getOne();
  }
}
