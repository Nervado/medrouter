import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Manager } from './models/manager.entity';

@EntityRepository(Manager)
export class ManagerRepository extends Repository<Manager> {
  async createOne(managerDto: any, user: any): Promise<Manager> {
    const manager = new Manager();

    const { salary } = managerDto;

    manager.ishired = true;
    manager.hireddate = new Date();
    manager.salary = salary;
    manager.user = user;

    this.merge(manager, managerDto);

    try {
      return await manager.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Manager already exists');
      } else {
        throw new InternalServerErrorException('Uknow error!');
      }
    }
  }

  async index(page: number): Promise<Manager[]> {
    const pageNumber: number = page * 5 - 5;
    const managers = await this.createQueryBuilder('manager')
      .leftJoinAndSelect('manager.user', 'user')
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(5)
      .getMany();

    return managers;
  }

  async updateOne(id: any, body: any): Promise<Manager> {
    const manager = await this.findOne(id);

    this.merge(manager, body);
    return await this.save(manager);
  }
}
