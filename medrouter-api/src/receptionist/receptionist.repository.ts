import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';

import { Receptionist } from './models/receptionist.entity';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';
import { Role } from 'src/auth/enums/role.enum';
import { RepositoryInterface } from 'src/utils/base-repository.interface';
import { ReceptionistDto } from './dto/receptionist.dto';
import { User } from 'src/users/models/user.entity';

@EntityRepository(Receptionist)
export class ReceptionistRepository extends Repository<Receptionist>
  implements
    RepositoryInterface<Receptionist, any, ReceptionistDto, User, string> {
  async createOne(
    receptionistDto: ReceptionistDto,
    user: any,
  ): Promise<Receptionist> {
    const receptionist = new Receptionist();

    const { salary } = receptionistDto;

    if (!salary) {
      throw new BadRequestException('Salary not provide');
    }

    receptionist.ishired = true;
    receptionist.hireddate = new Date();
    receptionist.salary = salary;
    receptionist.user = user;

    this.merge(receptionist, receptionistDto);

    try {
      return await receptionist.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('Receptionist already exists');
      } else {
        throw new InternalServerErrorException('Uknow error!');
      }
    }
  }

  async getById(id: number) {
    return this.findOne(id);
  }

  async getAll(search: SearchFilterDto): Promise<Receptionist[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = this.createQueryBuilder('receptionist');

    if (username) {
      query.andWhere(`username ILIKE '%${username}%'`);
    }

    const receptionists = await query
      .leftJoinAndSelect('receptionist.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return receptionists;
  }

  async index(page: number): Promise<Receptionist[]> {
    const pageNumber: number = page * 10 - 10;
    const receptionists = await this.createQueryBuilder('receptionist')
      .leftJoinAndSelect('receptionist.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return receptionists;
  }

  async updateOne(
    id: string,
    body: any,
    operation?: string,
  ): Promise<Receptionist> {
    const receptionist = await this.findOne({ id });

    if (
      operation === 'status' &&
      body === 're-hired' &&
      !receptionist.ishired
    ) {
      receptionist.ishired = true;
      receptionist.dismissdate = null;
      receptionist.hireddate = new Date();

      if (!receptionist.user.role.find(role => role === Role.RECEPT)) {
        receptionist.user.role = [...receptionist.user.role, Role.RECEPT];
      }

      try {
        return await this.save(receptionist);
      } catch (error) {
        throw new BadRequestException('Operation fail', operation);
      }
    }

    if (operation === 'status' && body === 'dismiss' && receptionist.ishired) {
      receptionist.ishired = false;
      receptionist.salary = 0;
      receptionist.dismissdate = new Date();

      if (receptionist.user.role.find(role => (role = Role.RECEPT))) {
        receptionist.user.role = [
          ...receptionist.user.role.filter(role => role !== Role.RECEPT),
        ];
      }

      try {
        return await this.save(receptionist);
      } catch (error) {
        throw new BadRequestException('Operation fail', operation);
      }
    }

    if (operation === 'diff' && receptionist.ishired) {
      try {
        await this.createQueryBuilder()
          .update(Receptionist)
          .set({ salary: () => `salary + ${body}` })
          .where({ id })
          .execute();

        return await this.findOne(id);
      } catch (error) {
        throw new BadRequestException('Operation fail', operation);
      }
    }

    if (
      operation !== 'diff' &&
      operation !== 'status' &&
      receptionist.ishired
    ) {
      try {
        return await this.save(receptionist);
      } catch (error) {
        throw new BadRequestException('Operation fail', error);
      }
    }
  }
}
