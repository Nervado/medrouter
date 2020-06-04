import { Owner } from './models/owner.entity';
import { Repository, EntityRepository } from 'typeorm';
import { RepositoryInterface } from 'src/utils/base-repository.interface';
import { OwnerDto } from './dtos/owner-dto';
import { User } from 'src/users/models/user.entity';
import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner>
  implements RepositoryInterface<Owner, number, OwnerDto, User, string> {
  async index(page: number): Promise<Owner[]> {
    const pageNumber: number = page * 10 - 10;
    const owners = await this.createQueryBuilder('owner')
      .leftJoinAndSelect('owner.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return owners;
  }

  async getAll(search: SearchFilterDto): Promise<Owner[]> {
    const { page, username } = search;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = this.createQueryBuilder('owner');

    if (username) {
      query.andWhere(`username ILIKE '%${username}%'`);
    }

    const owners = await query
      .leftJoinAndSelect('owner.user', 'user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return owners;
  }

  async getById(id: number) {
    return this.findOne(id);
  }

  async createOne(ownerDto: OwnerDto, user: User): Promise<Owner> {
    const owner = new Owner();

    const { salary } = ownerDto;
    if (!salary) {
      throw new BadRequestException('Salary  not provide');
    }

    owner.ishired = true;
    owner.hireddate = new Date();
    owner.salary = salary;
    owner.user = user;
    this.merge(owner, ownerDto);

    try {
      return await owner.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('owner already exists');
      } else {
        console.log(error);
        throw new InternalServerErrorException('Uknow error!');
      }
    }
  }

  async updateOne(id: any, body: any, operation?: string): Promise<Owner> {
    const owner = await this.findOne({ id });

    if (operation === 'status' && body === 're-hired' && !owner.ishired) {
      owner.ishired = true;
      owner.dismissdate = null;
      owner.hireddate = new Date();

      if (!owner.user.role.find(role => role === Role.OWNER)) {
        owner.user.role = [...owner.user.role, Role.OWNER];
      }

      try {
        return await this.save(owner);
      } catch (error) {
        throw new BadRequestException('Operation fail', error);
      }
    }

    if (operation === 'status' && body === 'dismiss' && owner.ishired) {
      owner.ishired = false;
      owner.salary = 0;
      owner.dismissdate = new Date();

      if (owner.user.role.find(role => (role = Role.OWNER))) {
        owner.user.role = [
          ...owner.user.role.filter(role => role !== Role.OWNER),
        ];
      }

      try {
        return await this.save(owner);
      } catch (error) {
        throw new BadRequestException('Operation fail', error);
      }
    }

    if (operation === 'diff' && owner.ishired) {
      try {
        await this.createQueryBuilder()
          .update(Owner)
          .set({ salary: () => `salary + ${body}` })
          .where({ id })
          .execute();

        return await this.findOne(id);
      } catch (error) {
        throw new BadRequestException('Operation fail', operation);
      }
    }
    if (operation !== 'diff' && operation !== 'status' && owner.ishired) {
      try {
        return await this.save(owner);
      } catch (error) {
        throw new BadRequestException('Operation fail', error);
      }
    }
  }
}
