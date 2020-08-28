import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Lab } from './models/lab.entity';
import { LabsRepository } from './labs.repository';
import { LabDto } from './dto/lab.dto';
import { SearchLab } from './dto/searchlab.dto';
import { LabChangesDto } from './dto/labStatus-dto';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/auth/enums/role.enum';
import { User } from 'src/users/models/user.entity';
import { SearchClientDto } from 'src/client/dtos/search-client-dto';
import { ExamDto } from 'src/exams/dto/exam.dto';
import { ExamsService } from 'src/exams/exams.service';
import { ClientDto } from 'src/client/dtos/cliente-dto';

@Injectable()
export class LabsService {
  constructor(
    @InjectRepository(LabsRepository) private repo: LabsRepository,
    @Inject(forwardRef(() => ExamsService))
    private es: ExamsService,
    private us: UsersService,
  ) {}

  async create(labdto: LabDto): Promise<Lab> {
    const lab = new Lab();

    Lab.merge(lab, labdto);

    try {
      await lab.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail to create lab');
    }

    return lab;
  }

  async get(search: SearchLab): Promise<Lab[]> {
    return await this.repo.search(search);
  }

  async change(id: string, change: LabChangesDto): Promise<Lab> {
    const lab = await this.repo.findOne({ where: { id } });

    const { available, users, cpf, exams, labcategory } = change;

    const user = cpf ? await this.us.findByCpf(cpf) : undefined;

    if (users) {
      users.forEach(async user => {
        await this.us.removeRole(user.userId, Role.LAB);
      });
    }

    if (!lab) {
      throw new NotFoundException('Lab not found');
    }

    return await this.repo.updateStatusOrUsers(
      lab,
      user,
      available,
      users,
      exams,
      labcategory,
    );
  }

  async getOne(id: string, user?: User): Promise<Lab> {
    const query = this.repo.createQueryBuilder('lab');

    if (id) {
      query.andWhere('id = :id', { id });
    }

    const lab = await query.leftJoinAndSelect('lab.users', 'users').getOne();

    if (user && !lab.users.find(_user => _user.userId === user.userId)) {
      throw new UnauthorizedException('Access not allowed');
    }

    return lab;
  }

  async findOne(userId: any, user?: User): Promise<Lab> {
    if (parseInt(userId) !== user?.userId) {
      throw new UnauthorizedException('Not Allowed');
    }

    const query = this.repo.createQueryBuilder('lab');

    query.andWhere('users.userId = :userId', { userId });

    const lab = await query.leftJoinAndSelect('lab.users', 'users').getOne();

    return lab;
  }

  async findAll(
    search: SearchClientDto,
    user: User,
    id: string,
  ): Promise<ExamDto[]> {
    const lab = await this.repo.findOne(id);

    if (!lab) {
      throw new NotFoundException('Lab not found');
    }
    console.log(lab, search);
    if (!lab.users.find(_user => _user.userId === user.userId)) {
      throw new UnauthorizedException('Search Not Allowed');
    }

    return await this.es.getAll(undefined, search, user, lab.id);
  }

  async getClientsWithRelatedExam(
    id: string,
    search: SearchClientDto,
    user: User,
  ): Promise<ClientDto[]> {
    // check lab

    const lab = await this.repo.findOne(id);

    if (!lab) {
      throw new BadRequestException('Lab not found');
    }

    if (!lab.users.find(_user => _user.userId === user.userId)) {
      throw new UnauthorizedException('Acess not allowed to exams list');
    }

    return this.es.getClientsWithRelatedExam(id, search);
  }
}
