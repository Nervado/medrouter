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

    query.andWhere('appointment.status <> :status ', {
      status: AppointmentStatus.CANCELED,
    });

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
}
