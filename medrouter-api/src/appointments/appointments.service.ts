import { Injectable } from '@nestjs/common';
import { Appointment } from './models/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchAppointment } from './dto/search-appointment.dto';
import { QueryBuilder } from 'typeorm';

@Injectable()
export class AppointmentsService {
  constructor() {}

  async getOne(id: string): Promise<Appointment> {
    return await Appointment.findOne({ where: { id } });
  }

  async searchOne(search: SearchAppointment): Promise<Appointment> {
    const query = Appointment.createQueryBuilder('appointment');

    const { doctorId, hour, date } = search;

    query.andWhere('doctor.id = :id', { id: doctorId });
    query.andWhere('hour = :hour', { hour });
    query.andWhere('date = :date', { date });

    return await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .getOne();
  }
}
