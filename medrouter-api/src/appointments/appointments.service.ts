import { Injectable } from '@nestjs/common';
import { Appointment } from './models/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { SearchAppointment } from './dto/search-appointment.dto';
import { QueryBuilder } from 'typeorm';
import { getMidnight } from 'src/utils/getMidnight';

@Injectable()
export class AppointmentsService {
  constructor() {}

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
}
