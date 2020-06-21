import {
  Injectable,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { ServiceInterface } from '../utils/service.interface';
import { Manager } from './models/manager.entity';
import { ManagerDto } from './dto/manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerRepository } from './manager.repository';
import { UsersService } from '../users/users.service';
import { Role } from 'src/auth/enums/role.enum';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';

@Injectable()
export class ManagerService
  implements ServiceInterface<Manager, any, ManagerDto, string> {
  constructor(
    @InjectRepository(ManagerRepository)
    private managerRepository: ManagerRepository,
    private readonly usersService: UsersService,
  ) {}

  async getMany(page: number): Promise<Manager[]> {
    return this.managerRepository.index(page);
  }

  async getAll(search: SearchFilterDto): Promise<Manager[]> {
    return this.managerRepository.getAll(search);
  }
  async getOne(id: string): Promise<Manager> {
    return this.managerRepository.findOne({ where: { id } });
  }

  async createOne(body: ManagerDto): Promise<Manager> {
    const user = await this.usersService.findOne(body.user.email);

    if (user.role.find(rol => rol === Role.MANAGER)) {
      throw new BadRequestException('Manager already exists!');
    }

    user.role = [...user.role, Role.MANAGER];
    return await this.managerRepository.createOne(body, user);
  }

  async updateOne(id: string, body: ManagerDto): Promise<Manager> {
    return this.managerRepository.updateOne(id, body);
  }

  async modifyOne(
    id: string,
    body: ManagerDto,
    operation: string,
  ): Promise<Manager> {
    return await this.managerRepository.updateOne(id, body, operation);
  }

  async deleteOne(id: string): Promise<void> {
    await this.managerRepository.softDelete({ id });
  }

  async delete(id: string) {
    const manager = await this.getOne(id);
    try {
      await this.usersService.resetRole(manager.user.userId);
      return this.managerRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException('Fail operation:delete');
    }
  }
}
