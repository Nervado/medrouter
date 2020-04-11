import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { Manager } from './models/manager.entity';

@EntityRepository(Manager)
export class ManagerRepository extends Repository<Manager> {
  async createOne(managerDto: any, user: any): Promise<Manager> {
    const manager = new Manager();

    const { salary } = managerDto;

    if (!salary) {
      throw new BadRequestException('Salary not provide');
    }

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

  async updateOne(id: number, body: any, operation?: string): Promise<Manager> {
    const manager = await this.findOne({ id });

    if (operation === 'status' && body === 're-hired' && !manager.ishired) {
      try {
        manager.ishired = true;
        manager.user.admin = true; // update all privilleges
        manager.dismissdate = null;
        manager.hireddate = new Date();

        return await this.save(manager);
      } catch (error) {
        throw new BadRequestException('Operation fail', operation);
      }
    }

    if (operation === 'status' && body === 'dismiss' && manager.ishired) {
      try {
        manager.ishired = false;
        manager.salary = 0;
        manager.user.admin = false;
        manager.dismissdate = new Date();
        return await this.save(manager);
      } catch (error) {
        throw new BadRequestException('Operation fail', operation);
      }
    }

    if (operation === 'diff' && manager.ishired) {
      try {
        await this.createQueryBuilder()
          .update(Manager)
          .set({ salary: () => `salary + ${body}` })
          .where({ id })
          .execute();

        return await this.findOne(id);
      } catch (error) {
        throw new BadRequestException('Operation fail', operation);
      }
    }
  }
}
