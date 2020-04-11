import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ServiceInterface } from '../utils/service.interface';
import { Manager } from './models/manager.entity';
import { ManagerDto } from './dto/manager.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerRepository } from './manager.repository';
import { UsersService } from '../users/users.service';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class ManagerService
  implements ServiceInterface<Manager, number, ManagerDto, string> {
  constructor(
    @InjectRepository(ManagerRepository)
    private managerRepository: ManagerRepository,
    private readonly usersService: UsersService,
  ) {}

  async getMany(page: number): Promise<Manager[]> {
    return this.managerRepository.index(page);
  }

  async getOne(id: number): Promise<Manager> {
    return this.managerRepository.findOne({ where: { id } });
  }

  async createOne(body: ManagerDto): Promise<Manager> {
    const user = await this.usersService.findOne(body.user.email);
    user.admin = true;
    user.role = [Role.ADMIN, Role.CLIENT];
    return this.managerRepository.createOne(body, user);
  }

  async updateOne(id: number, body: ManagerDto): Promise<Manager> {
    return this.managerRepository.updateOne(id, body);
  }

  async modifyOne(
    id: number,
    body: ManagerDto,
    operation: string,
  ): Promise<Manager> {
    return await this.managerRepository.updateOne(id, body, operation);
  }

  async deleteOne(id: number): Promise<void> {
    await this.managerRepository.softDelete({ id });
  }

  async delete(id: number) {
    const manager = await this.getOne(id);
    try {
      await this.usersService.resetRole(manager.user.userId);
      return this.managerRepository.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException('Fail operation:delete');
    }
  }
}
