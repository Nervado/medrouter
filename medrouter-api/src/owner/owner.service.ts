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
import { StatsDto, Stats, Stat } from './dtos/stats.dto';
import { addDays, subMonths } from 'date-fns';
import { Months } from 'src/client/dtos/data-graph';

@Injectable()
export class OwnerService extends Service<
  OwnerDto,
  Owner,
  OwnerRepository,
  any,
  User,
  string
> {
  private months = Months;

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

  async getStats(id: string, user: User): Promise<StatsDto> {
    const owner = await Owner.findOne(id);

    if (!owner || owner.user.userId !== user.userId) {
      throw new BadRequestException('Operation not allowed for current user');
    }

    const date = addDays(new Date(), 1);

    const dates = new Array(12).fill([date, date]).map((_, i) => {
      return [subMonths(date, i + 1), subMonths(date, i)];
    });

    return await this.readStats(dates);
  }

  async readStats(dates: any[]): Promise<StatsDto> {
    const results = [];
    for (const lims of dates) {
      results.push(await this.getStatsOverMonth(lims[0], lims[1]));
    }

    const a: Stat[] = results.map(s => s[0]).reverse();
    const c: Stat[] = results.map(d => d[1]).reverse();
    const r: Stat[] = results.map(d => d[2]).reverse();
    const q: Stat[] = results.map(d => d[3]).reverse();
    const o: Stat[] = results.map(d => d[4]).reverse();

    const pa: number = a.reduce((pv, cv) => pv + cv.value, 0);
    const pc: number = c.reduce((pv, cv) => pv + cv.value, 0);
    const pr: number = r.reduce((pv, cv) => pv + cv.value, 0);
    const pq: number = q.reduce((pv, cv) => pv + cv.value, 0);
    const po: number = o.reduce((pv, cv) => pv + cv.value, 0);

    const yearAmount = pa + pc + pr + pq + po;

    const result: StatsDto = {
      finished: {
        percent: (100 * pa) / yearAmount,
        stats: a,
      },
      canceled: {
        percent: (100 * pc) / yearAmount,
        stats: c,
      },
      reschedule: {
        percent: (100 * pr) / yearAmount,
        stats: r,
      },
      returned: {
        percent: (100 * pq) / yearAmount,
        stats: q,
      },
      onscheduled: {
        percent: (100 * po) / yearAmount,
        stats: o,
      },
    };

    return result;
  }

  async getStatsOverMonth(start: Date, end: Date): Promise<Stat[]> {
    const attended = await this.getAppointmentsInRange(
      AppointmentStatus.ATTENDED,
      {
        start,
        end,
      },
    );

    const canceled = await this.getAppointmentsInRange(
      AppointmentStatus.CANCELED,
      {
        start,
        end,
      },
    );

    const reschedule = await this.getAppointmentsInRange(
      AppointmentStatus.RESCHEDULED,
      {
        start,
        end,
      },
    );

    const requested = await this.getAppointmentsInRange(
      AppointmentStatus.REQUESTED,
      {
        start,
        end,
      },
    );

    const onscheduled = await this.getAppointmentsInRange(
      AppointmentStatus.ONESCHEDULE,
      {
        start,
        end,
      },
    );

    return [
      {
        label: this.months[end.getMonth()],
        value: attended,
      },
      {
        label: this.months[end.getMonth()],
        value: canceled,
      },
      {
        label: this.months[end.getMonth()],
        value: reschedule,
      },
      {
        label: this.months[end.getMonth()],
        value: requested,
      },
      {
        label: this.months[end.getMonth()],
        value: onscheduled,
      },
    ];
  }

  async getAppointmentsInRange(
    status: AppointmentStatus,
    rangeDate: { start: Date; end: Date },
  ): Promise<number> {
    const { start, end } = rangeDate;

    /**
     * 
     * 
    if (status === AppointmentStatus.REQUESTED) {
      const query = Client.createQueryBuilder('client');

      query.andWhere(
        ' appointment.createdAt >= :start  AND  appointment.createdAt < :end ',
        {
          start,
          end,
        },
      );
      const q = await query
        .leftJoin('client.appointments', 'appointment')
        .addSelect('COUNT(DISTINCT(appointment.id))', 'app')
        .groupBy('client.id')
        .getRawMany();

      const results = q.filter(r => r.app > 1);

      console.log(results.length);

      return results.length || 0;
    }
     * 
     */

    const query = Appointment.createQueryBuilder('appointment');

    query.andWhere(
      'appointment.status = :status AND appointment.createdAt >= :start  AND  appointment.createdAt < :end ',
      {
        status,
        start,
        end,
      },
    );
    try {
      return await query.getCount();
    } catch (error) {
      throw new InternalServerErrorException('Fail at get prescriptions data');
    }
  }
}
