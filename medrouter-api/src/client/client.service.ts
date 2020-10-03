import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Client } from './models/client.entity';
import { AuthSingUpDto } from 'src/auth/dto/auth-signup.dto';
import { generatePass } from 'src/utils/hash-pass';
import { SearchClientDto } from './dtos/search-client-dto';
import { SearchResultDto } from './dtos/search-result-dto';
import { User } from 'src/users/models/user.entity';
import { DocDto } from 'src/docs/dto/doc.dto';
import { Role } from 'src/auth/enums/role.enum';
import { PhotosService } from 'src/photos/photos.service';
import { AppointmentDto } from 'src/appointments/dto/appointment.dto';

import { Appointment } from 'src/appointments/models/appointment.entity';
import { AppointmentStatus } from 'src/appointments/enums/appointment.enum';
import { ExamDto } from 'src/exams/dto/exam.dto';
import { Exam } from 'src/exams/models/exam.entity';
import { ExamStatus } from 'src/exams/enums/status.enum';
import { getMidnight, isPast } from 'src/utils/getMidnight';
import { PrescriptionDto } from 'src/prescriptions/dto/prescription.dto';
import { Prescription } from 'src/prescriptions/models/prescription.entity';
import { arrayFromObject } from 'src/utils/arrayFromObject';
import { DataGraph, DataMonth } from './dtos/data-graph';

import {
  subMonths,
  addDays,
  setDate,
  setYear,
  setMonth,
  format,
  isSameDay,
} from 'date-fns';
import { Months } from './dtos/data-graph';
import { NonClientAppointmentRequest } from './dtos/non-client-dto';
import { AvailableSearchDto } from './dtos/availablesearch-dto';
import { AvailableHoursDto } from './dtos/availablehours-dto';
import { Schedule } from 'src/doctors/models/schedule.entity';
import { Doctor } from 'src/doctors/models/doctor.entity';

import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationTopics } from 'src/notifications/enums/notificaiton-topic.enum';
import { Owner } from 'src/owner/models/owner.entity';
import { EmailsService } from 'src/emails/emails.service';
import { EmailTypes } from 'src/emails/enums/email-types';
import { EmailsGroups } from 'src/emails/enums/emails-groups';

@Injectable()
export class ClientService {
  private months = Months;

  constructor(
    @Inject(forwardRef(() => UsersService)) private us: UsersService,
    private ps: PhotosService,
    private ns: NotificationsService,
    private es: EmailsService,
  ) {}

  async create(client: AuthSingUpDto): Promise<any> {
    client.password = generatePass();
    client.passwordConfirmation = client.password;

    const user = await this.us.signUp(client);

    if (!user) {
      throw new InternalServerErrorException('Fail at init client');
    }

    return this.addClient(user);
  }

  async addClient(user: User): Promise<Client> {
    const query = Client.createQueryBuilder('client');

    query.andWhere(`user.userId = :userId`, { userId: user.userId });

    const founds = await query
      .leftJoinAndSelect('client.user', 'user')
      .getOne();

    if (!founds) {
      const client = new Client();

      client.user = user;

      try {
        await client.save();
      } catch (error) {
        throw new InternalServerErrorException('Fail at create client');
      }

      await this.ns.create({
        receiver: client.user.userId,
        message: `Bem vindo a clinica Medrouter ${client.user.username}`,
        topic: NotificationTopics.PACIENT,
        read: false,
        date: new Date(),
      });

      //notify owners
      const owners = (
        await Owner.createQueryBuilder('owner')
          .leftJoinAndSelect('owner.user', 'user')
          .getMany()
      ).map(owner => owner.user.userId);

      // remove after tests
      console.log(owners);

      for (const id of owners) {
        await this.ns.create({
          receiver: id,
          message: `O paciente ${client.user.username} é um novo cliente MedRouter`,
          topic: NotificationTopics.PACIENT,
          read: false,
          date: new Date(),
        });
      }

      return client;
    } else {
      return founds;
    }
  }

  async updateStatus(id: string, checked: boolean): Promise<void> {
    const client = await Client.findOne({ where: { id } });

    if (client.photo?.url === undefined || client.photo?.url === null) {
      throw new BadRequestException('Not allowed');
    }

    client.user.checked = checked;

    try {
      await client.save();
    } catch (error) {
      throw new InternalServerErrorException('Update client status failure');
    }
  }

  async getClientsWithActiveAppointments(
    search: SearchClientDto,
  ): Promise<SearchResultDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = Client.createQueryBuilder('client');

    if (username) {
      query.andWhere(
        `user.username  ILIKE '%${username}%' OR user.surname  ILIKE '%${username}%'`,
      );
    }

    const founds = await query
      .leftJoinAndSelect('client.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(10)
      .getMany();

    const results = founds.map(client => {
      return {
        id: client.id,
        user: {
          username: client.user.username,
          fullname: client.user.fullname,
          surname: client.user.surname,
          avatar: {
            url: client.user.avatar?.url,
          },
        },
      };
    });

    return results;
  }

  async getAll(search: SearchClientDto): Promise<SearchResultDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = Client.createQueryBuilder('client');

    if (username) {
      query.andWhere(
        `user.username  ILIKE '%${username}%' OR user.surname  ILIKE '%${username}%'`,
      );
    }

    const founds = await query
      .leftJoinAndSelect('client.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('client.photo', 'photo')
      .skip(pageNumber)
      .take(10)
      .getMany();

    const clients: SearchResultDto[] = [
      ...founds.map((client: Client) => this.serializeClient(client)),
    ];

    return clients;
  }

  async verify(id: string): Promise<void> {
    const client = await Client.findOne({ where: { id } });
    return await this.us.checkUser(client.user);
  }

  async updateDoc(id: string, user: User, doc: DocDto): Promise<void> {
    const client = await Client.findOne({ where: { id } });

    if (
      client.user.userId !== user.userId &&
      !user.role.find(rol => rol === Role.RECEPT)
    ) {
      throw new UnauthorizedException('Action not allowed');
    }

    const photo = await this.ps.getOne(doc.id);

    client.photo = photo;

    try {
      await client.save();
    } catch (error) {
      throw new InternalServerErrorException('Update client photo-doc failure');
    }
  }

  async findOne(id: string): Promise<Client> {
    const client: Client = await Client.findOne({ where: { id } });

    if (!client) {
      throw new BadRequestException('Client dont exists!');
    }

    return client;
  }

  serializeClient(client: Client): SearchResultDto {
    return {
      id: client.id,
      photo: {
        url: client.photo?.url,
      },
      user: {
        userId: client.user.userId,
        username: client.user.username,
        fullname: client.user.fullname,
        email: client.user.email,
        phoneNumber: client.user.phoneNumber,
        birthdate: client.user?.birthdate,
        sex: client.user.sex,
        checked: client.user.checked,
        avatar: {
          avatarId: client.user.avatar?.avatarId,
          url: client.user.avatar?.url,
        },
      },
    };
  }

  async getOne(userId: string, user?: User): Promise<Client> {
    if (userId !== user.userId && !user.role.find(rol => rol === Role.RECEPT)) {
      throw new UnauthorizedException('Not Allowed');
    }

    const query = Client.createQueryBuilder('client');

    query.andWhere('user.userId = :userId', { userId });

    return await query
      .leftJoinAndSelect('client.user', 'user')

      .getOne();
  }

  async searchClientActiveAppointments(
    id: string,
    user: User,
    search: SearchClientDto,
  ): Promise<AppointmentDto[]> {
    const client = await Client.findOne(id);

    if (!client || client.user.userId !== user.userId) {
      throw new UnauthorizedException('Acess not allowed at appointments list');
    }

    return await this.searchClientAppointments(id, search);
  }

  async searchClientAppointments(
    id: string,
    search: SearchClientDto,
  ): Promise<AppointmentDto[]> {
    const { page } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = Appointment.createQueryBuilder('appointment');

    query.andWhere('client.id = :id ', { id });

    const founds = await query
      .leftJoinAndSelect('appointment.client', 'client')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'doctorUser')
      .leftJoinAndSelect('doctorUser.avatar', 'avatar')
      .skip(pageNumber)
      .orderBy('appointment.date', 'ASC')
      //.orderBy('appointment.hour', 'DESC')
      .take(10)
      .getMany();

    return founds.map(app => this.serializeClientAppointment(app)).reverse();
  }

  serializeClientAppointment(appointment: Appointment): AppointmentDto {
    return {
      id: appointment.id,
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

  async cancelAppointment(
    id: string,
    appId: string,
    user: User,
  ): Promise<void> {
    const client = await Client.findOne(id);

    const app = await Appointment.findOne(appId);

    const today = new Date();

    if (!client || !app) {
      throw new BadRequestException('Informations dont match');
    }

    if (user.userId !== client.user.userId) {
      throw new UnauthorizedException('Operation not allowed');
    }

    if (getMidnight(app.date).getTime() <= getMidnight(today).getTime()) {
      throw new BadRequestException('Appointment date is to close');
    }

    if (
      app.status !== AppointmentStatus.CANCELED &&
      app.status !== AppointmentStatus.ATTENDED
    ) {
      app.status = AppointmentStatus.CANCELED;
    }

    try {
      await app.save();
    } catch (error) {
      throw new InternalServerErrorException('Cancel appointment has fail');
    }
  }

  async searchClientExams(
    id: string,
    user: User,
    search: SearchClientDto,
  ): Promise<ExamDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const client = await Client.findOne(id);

    if (!client || client.user.userId !== user.userId) {
      throw new BadRequestException('Informations dont match');
    }

    const query = Exam.createQueryBuilder('exam');

    query.andWhere('client.id = :id', { id: id });

    if (username) {
      query.andWhere(
        `doctorUser.username ILIKE '%${username}%' OR  doctorUser.surname ILIKE '%${username}%' `,
      );
    }

    const founds = await query
      .leftJoinAndSelect('exam.doctor', 'doctor')
      .leftJoinAndSelect('exam.docs', 'docs')
      .leftJoinAndSelect('exam.photos', 'photos')
      .leftJoinAndSelect('exam.lab', 'lab')
      .leftJoinAndSelect('doctor.user', 'doctorUser')
      .leftJoinAndSelect('doctorUser.avatar', 'doctorAvatar')
      .leftJoinAndSelect('exam.client', 'client')
      .leftJoinAndSelect('client.user', 'clientUser')
      .leftJoinAndSelect('clientUser.avatar', 'clientAvatar')
      .orderBy('exam.createdAt', 'DESC')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return [
      ...new Set(
        founds.map((exam: Exam) =>
          this.serializeClientExam(
            exam,
            user?.userId === exam.client.user.userId,
            exam.status === ExamStatus.AVAILABLE,
          ),
        ),
      ),
    ];
  }

  serializeClientExam(
    exam: Exam,
    sendCode?: boolean,
    sendResult?: boolean,
  ): ExamDto {
    return {
      id: exam?.id,
      code: sendCode ? exam.code : null,
      price: exam.price,
      status: exam.status,
      deadline: exam.deadline,
      type: exam.type,
      docs: sendResult
        ? exam.docs.map(doc => {
            return { url: doc.url, id: doc.id };
          })
        : [],
      photos: sendResult
        ? exam.photos.map(photo => {
            return { url: photo.url, id: photo.id };
          })
        : [],
      createdAt: exam.createdAt,
      lab: {
        id: exam.lab?.id,
        name: exam.lab?.name,
        cnpj: exam.lab?.cnpj,
        available: exam.lab?.available,
        labcategory: exam.lab?.labcategory,
        exams: exam.lab?.exams,
      },

      client: {
        id: exam.client.id,
        user: {
          username: exam.client.user.username,
          fullname: exam.client.user.fullname,
          surname: exam.client.user.surname,
          avatar: {
            url: exam.client.user.avatar?.url,
          },
        },
      },
      doctor: {
        id: exam.doctor.id,
        user: {
          username: exam.doctor.user.username,
          fullname: exam.doctor.user.fullname,
          surname: exam.doctor.user.surname,
          avatar: {
            url: exam.doctor.user.avatar?.url,
          },
        },
      },
    };
  }

  async searchClientPrescriptions(
    id: string,
    user: User,
    search: SearchClientDto,
  ): Promise<PrescriptionDto[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const client = await Client.findOne(id);

    if (!client || client.user.userId !== user.userId) {
      throw new BadRequestException('Informations dont match');
    }
    const query = Prescription.createQueryBuilder('prescription');

    query.andWhere('client.id = :id', { id: id });

    if (username) {
      query.andWhere(
        `doctorUser.username ILIKE '%${username}%' OR  doctorUser.surname ILIKE '%${username}%' `,
      );
    }

    const founds = await query
      .leftJoinAndSelect('prescription.doctor', 'doctor')
      .leftJoinAndSelect('prescription.medicines', 'medicines')
      .leftJoinAndSelect('prescription.exams', 'exams')
      .leftJoinAndSelect('exams.lab', 'lab')
      .leftJoinAndSelect('doctor.user', 'doctorUser')
      .leftJoinAndSelect('doctorUser.avatar', 'doctorAvatar')
      .leftJoinAndSelect('prescription.client', 'client')
      .leftJoinAndSelect('client.user', 'clientUser')
      .leftJoinAndSelect('clientUser.avatar', 'clientAvatar')
      .orderBy('prescription.code', 'DESC')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return founds.map((prescription: Prescription) =>
      this.serializePrescription(prescription),
    );
  }

  serializePrescription(prescription: Prescription): PrescriptionDto {
    const checks = arrayFromObject(prescription.recomendations);
    const recoms = checks
      ? checks.map(p => {
          return p.trim().replace(/\"/g, '');
        })
      : [];
    return {
      id: prescription?.id,
      code: prescription?.code,
      recomendations: recoms[0] === '' ? [] : recoms,
      waist: prescription.waist,
      weight: prescription.weight,
      height: prescription.height,
      pressure: prescription.pressure,
      bpm: prescription.bpm,
      exams: prescription.exams.map(exam => {
        return {
          id: exam.id,
          price: exam.price,
          deadline: exam.deadline,
          status: exam.status,
          type: exam.type,
          createdAt: exam.createdAt,
          lab: {
            id: exam.lab?.id,
            name: exam.lab?.name,
            available: exam.lab?.available,
            labcategory: exam.lab?.labcategory,
          },
        };
      }),
      medicines: prescription.medicines,
      createdAt: prescription.createdAt,
      client: {
        id: prescription.client.id,
        user: {
          username: prescription.client.user.username,
          fullname: prescription.client.user.fullname,
          surname: prescription.client.user.surname,
          birthdate: prescription.client.user.birthdate,
          avatar: {
            url: prescription.client.user.avatar?.url,
          },
        },
      },
      doctor: {
        id: prescription.doctor.id,
        specialty: prescription.doctor.specialty,
        user: {
          username: prescription.doctor.user.username,
          fullname: prescription.doctor.user.fullname,
          surname: prescription.doctor.user.surname,
          avatar: {
            url: prescription.doctor.user.avatar?.url,
          },
        },
      },
    };
  }

  async getPressureReport(id: string, user: User): Promise<DataGraph> {
    const date = addDays(new Date(), 1);

    const client = await Client.findOne(id);

    if (!client || client.user.userId !== user.userId) {
      throw new UnauthorizedException('Not allowed get this information');
    }

    const dates = new Array(12).fill([date, date]).map((_, i) => {
      return [subMonths(date, i + 1), subMonths(date, i)];
    });

    return await this.readAverageData(id, dates);
  }

  async readAverageData(id: string, dates: any[]): Promise<DataGraph> {
    const results = [];
    for (const lims of dates) {
      results.push(await this.getPressureMonthAverage(id, lims[0], lims[1]));
    }

    const s: DataMonth[] = results.map(s => s[0]).reverse();
    const d: DataMonth[] = results.map(d => d[1]).reverse();

    return { PressureS: s, PressureD: d };
  }

  async getPressureMonthAverage(
    id: string,
    start: Date,
    end: Date,
  ): Promise<DataMonth[]> {
    const ranges = await this.getPrescriptionsInRange(id, {
      start,
      end,
    });

    if (ranges[1] > 0) {
      const raw = ranges[0]
        .filter(pre => pre.pressure !== null)
        .map(pre => pre.pressure.split('/'));

      const s =
        raw.map(s => parseFloat(s[0])).reduce((pv, cv) => pv + cv, 0) /
        raw.length;

      const d =
        raw.map(d => parseFloat(d[1])).reduce((pv, cv) => pv + cv, 0) /
        raw.length;

      return [
        {
          month: this.months[end.getMonth()],
          value: s,
        },
        {
          month: this.months[end.getMonth()],
          value: d,
        },
      ];
    } else {
      return [
        {
          month: this.months[end.getMonth()],
          value: 0,
        },
        {
          month: this.months[end.getMonth()],
          value: 0,
        },
      ];
    }
  }

  async getPrescriptionsInRange(
    id: string,
    rangeDate: { start: Date; end: Date },
  ): Promise<[Prescription[], number]> {
    const { start, end } = rangeDate;

    const query = Prescription.createQueryBuilder('prescription');

    query.andWhere(
      'client.id = :id AND prescription.createdAt >= :start  AND  prescription.createdAt < :end ',
      {
        id,
        start,
        end,
      },
    );
    try {
      return await query
        .leftJoinAndSelect('prescription.client', 'client')
        .getManyAndCount();
    } catch (error) {
      throw new InternalServerErrorException('Fail at get prescriptions data');
    }
  }

  async searchAvailableSpecialtys(): Promise<string[]> {
    const doctors = await Doctor.createQueryBuilder('doctor').getMany();

    return [...new Set(doctors.map(doctor => doctor.specialty[0]))];
  }

  async searchAvailableSchedules(
    search: AvailableSearchDto,
  ): Promise<AvailableHoursDto[]> {
    return await this.getFreeSchedules(search);
  }

  async createAppointmentAndNewClient(
    nonClientRequest: NonClientAppointmentRequest,
  ): Promise<void> {
    const {
      fullname,
      email,
      phoneNumber,
      specialty,
      hour,
      date,
    } = nonClientRequest;

    const _user = await User.findOne({ where: { email } });

    if (_user) {
      throw new UnauthorizedException('Not alowed by current route');
    }

    const names = fullname.split(' ');

    let surname = '';

    for (let index = 1; index < names.length; index++) {
      if (index === 1) {
        surname = names[index];
      } else {
        surname = ' ' + names[index];
      }
    }

    const client = await this.create({
      username: names[0],
      surname,
      phoneNumber,
      email,
    });

    // recheck free schedules

    const _date = new Date(date);

    const free = await this.getFreeSchedules({
      specialty,
      month: _date.getMonth(),
      year: _date.getFullYear(),
    });

    if (
      !free.find(
        fs => fs.day === _date.getDate() && fs.hours.find(h => h === hour),
      )
    ) {
      throw new BadRequestException('schedule alredy taken');
    }

    // create appointment

    const schedules = await this.searchManySchedules({
      specialty,
      month: _date.getMonth(),
      year: _date.getFullYear(),
    });

    const availables = schedules.filter(sch =>
      isSameDay(sch.date, getMidnight(_date)),
    );

    const randInt = Math.floor(Math.random() * availables.length);

    const schedule = availables[randInt];

    if (schedule.doctor.user.userId === client.user.userId) {
      throw new BadRequestException('Not allowed');
    }

    if (isPast(_date, hour)) {
      throw new BadRequestException('Time travel is forbiden');
    }

    const appointment = new Appointment();

    if (client.user.checked) {
      appointment.status = AppointmentStatus.ONESCHEDULE;
    }

    Appointment.merge(appointment, {
      doctor: schedule.doctor,
      client,
      date: getMidnight(_date),
      hour: hour,
      price: schedule.doctor.mh,
    });

    try {
      await appointment.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail to create appointment');
    }

    // send notification to confirm
    appointment &&
      (await this.ns.create({
        receiver: client.user.userId,
        message: `Olá ${client.user.username}, agendamemento com doutor (a) ${
          appointment.doctor.user.fullname
        } no dia ${format(
          appointment.date,
          'dd/MM/yyyy',
        )} as ${hour}h foi solicitado.`,
        topic: NotificationTopics.PACIENT,
        read: false,
        date: new Date(),
      }));

    // send notification to confirm
    appointment &&
      (await this.ns.create({
        receiver: appointment.client.user.userId,
        message: `Olá ${client.user.username}, agendamemento com doutor (a) ${
          appointment.doctor.user.fullname
        } no dia ${format(appointment.date, 'dd/MM/yyyy')} as ${hour}h foi ${
          appointment.status === AppointmentStatus.ONESCHEDULE
            ? 'confirmado'
            : 'solicitado'
        }.`,
        topic: NotificationTopics.PACIENT,
        read: false,
        date: new Date(),
      }));

    appointment &&
      (await this.ns.create({
        receiver: appointment.doctor.user.userId,
        message: `Olá o paciente ${
          client.user.username
        }, solicitou uma consulta com você no dia ${format(
          appointment.date,
          'dd/MM/yyyy',
        )} as ${hour}h.`,
        topic: NotificationTopics.PACIENT,
        read: false,
        date: new Date(),
      }));

    // send email to doctor

    const data1 = {
      doctor: appointment.doctor.user.fullname,
      user: appointment.client.user.fullname,
      //date: appointment.date,
      hour: appointment.hour,
      doctorEmail: appointment.doctor.user.email,
      email: appointment.client.user.email,
      message: `Olá ${client.user.username}, agendamemento com doutor (a) ${
        appointment.doctor.user.fullname
      } no dia ${format(appointment.date, 'dd/MM/yyyy')} as ${hour}h foi ${
        appointment.status === AppointmentStatus.ONESCHEDULE
          ? 'confirmado'
          : 'solicitado'
      }.`,
      date: `${format(appointment.date, 'dd/MM/yyyy')}`,
      status: appointment.status,
    };

    const data2 = {
      doctor: appointment.doctor.user.fullname,
      user: appointment.client.user.fullname,
      //date: appointment.date,
      hour: appointment.hour,
      doctorEmail: appointment.doctor.user.email,
      email: appointment.doctor.user.email,
      message: `Olá o paciente ${
        client.user.username
      }, solicitou um consulta com você no dia ${format(
        appointment.date,
        'dd/MM/yyyy',
      )} as ${hour}h.`,
      date: `${format(appointment.date, 'dd/MM/yyyy')}`,
    };

    this.es.sendEmail(data1, EmailTypes.APPOINTMENT, EmailsGroups.CLIENTS);

    this.es.sendEmail(
      data2,
      EmailTypes.DOCTOR_APPOINTMENT,
      EmailsGroups.PROFESSIONALS,
    );
  }

  // query to search available schedules
  async getFreeSchedules(
    search: AvailableSearchDto,
  ): Promise<AvailableHoursDto[]> {
    console.log(search);

    try {
      const founds = await this.searchManySchedules(search);

      const searchAppointments = await this.searchManyApp(search);

      const schedules = [
        ...founds.map(sc => {
          const hours = sc.availablehours
            .map(hour => {
              const find = searchAppointments.find(
                appointment =>
                  appointment.hour === hour &&
                  sc.date.toString() === appointment.date.toString() &&
                  appointment.doctor.id === sc.doctor.id,
              );

              return { hour: hour, busy: find ? true : false };
            })
            .filter(sc => sc.busy === false);

          return {
            id: sc.id,
            date: sc.date,
            hours: hours.map(h => h.hour),
          };
        }),
      ];

      const results = [
        ...new Set(schedules.map(sch => sch.date.getDate())),
      ].map(day => {
        const hours: any[] = schedules
          .filter(sch => sch.date.getDate() === day)
          .map(sch => sch.hours);

        return {
          day,
          hours: [...new Set([].concat(...hours))],
        };
      });

      console.log(results);

      return results.filter(r => r.hours.length > 0);
    } catch (error) {
      throw new InternalServerErrorException('Fail to retrive schedule');
    }
  }

  async searchManyApp(search: AvailableSearchDto): Promise<Appointment[]> {
    const query = Appointment.createQueryBuilder('appointment');
    const { year, month, specialty } = search;

    const date = getMidnight(
      setYear(setDate(setMonth(new Date(), month), 1), year),
    );

    const endDate = getMidnight(
      setYear(setDate(setMonth(new Date(), month + 1), 1), year),
    );

    query.andWhere(`doctor.specialty <@ (:specialty)`, {
      specialty: [specialty],
    });

    query.andWhere('status != :status', { status: AppointmentStatus.CANCELED });

    query.andWhere('date >= :date', { date });

    query.andWhere('date < :endDate', {
      endDate,
    });

    return await query
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .orderBy('date', 'ASC')
      .orderBy('hour', 'ASC')
      .getMany();
  }

  async searchManySchedules(search: AvailableSearchDto): Promise<Schedule[]> {
    const query = Schedule.createQueryBuilder('schedule');
    const { year, month, specialty } = search;

    query.andWhere(`doctor.specialty <@ (:specialty)`, {
      specialty: [specialty],
    });

    const date = getMidnight(
      setYear(setDate(setMonth(new Date(), month), 1), year),
    );

    const endDate = getMidnight(
      setYear(setDate(setMonth(new Date(), month + 1), 1), year),
    );

    console.log(date, endDate);

    query.andWhere('date >= :date', { date });
    query.andWhere('date < :endDate', {
      endDate,
    });

    return await query
      .leftJoinAndSelect('schedule.doctor', 'doctor')
      .leftJoinAndSelect('doctor.user', 'user')
      .getMany();
  }
}
