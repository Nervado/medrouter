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
import { ModuleRef } from '@nestjs/core';
import { Appointment } from 'src/appointments/models/appointment.entity';
import { AppointmentStatus } from 'src/appointments/enums/appointment.enum';
import { ExamDto } from 'src/exams/dto/exam.dto';
import { Exam } from 'src/exams/models/exam.entity';
import { ExamStatus } from 'src/exams/enums/status.enum';
import { getMidnight } from 'src/utils/getMidnight';
import { PrescriptionDto } from 'src/prescriptions/dto/prescription.dto';
import { Prescription } from 'src/prescriptions/models/prescription.entity';
import { arrayFromObject } from 'src/utils/arrayFromObject';

@Injectable()
export class ClientService {
  //private appointmentService: AppointmentsService;

  constructor(
    @Inject(forwardRef(() => UsersService)) private us: UsersService,
    private ps: PhotosService, //@Inject(forwardRef(() => AppointmentsService))
    private moduleRef: ModuleRef, //private as: AppointmentsService,
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

    if (founds) {
      throw new BadRequestException('User already have a client rule');
    }

    const client = new Client();

    client.user = user;

    try {
      await client.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Fail at create client');
    }

    return client;
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

  async getOne(userId: any, user?: User): Promise<Client> {
    if (
      parseInt(userId) !== user.userId &&
      !user.role.find(rol => rol === Role.RECEPT)
    ) {
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

    return this.searchClientAppointments(id, search);
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
      .orderBy('appointment.date', 'DESC')
      .take(10)
      .getMany();

    return founds.map(app => this.serializeClientAppointment(app));
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

    console.log(app);

    if (!client || !app) {
      throw new BadRequestException('Informations dont match');
    }

    if (user.userId !== client.user.userId) {
      throw new UnauthorizedException('Operation not allowed');
    }

    if (getMidnight(app.date) <= getMidnight(today)) {
      throw new BadRequestException('Appointment date is to close');
    }

    if (
      app.status !== AppointmentStatus.CANCELED &&
      app.status !== AppointmentStatus.ATTENDED
    ) {
      app.status = AppointmentStatus.CANCELED;
      console.log(app);
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
}
