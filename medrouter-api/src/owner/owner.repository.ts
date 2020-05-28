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

@EntityRepository(Owner)
export class OwnerRepository extends Repository<Owner>
  implements RepositoryInterface<Owner, number, OwnerDto, User, string> {
  async index(page: number): Promise<Owner[]> {
    const pageNumber: number = page * 5 - 5;
    const owners = await this.createQueryBuilder('owner')
      .leftJoinAndSelect('owner.user', 'user')
      .leftJoinAndSelect('user.address', 'address')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(5)
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
      owner.user.owner = true; // update all privilleges
      owner.dismissdate = null;
      owner.hireddate = new Date();
      owner.user.role = [Role.DOCTOR, Role.CLIENT];

      try {
        return await this.save(owner);
      } catch (error) {
        throw new BadRequestException('Operation fail', error);
      }
    }

    if (operation === 'status' && body === 'dismiss' && owner.ishired) {
      owner.ishired = false;
      owner.salary = 0;
      owner.user.owner = false; // remove all privilleges
      owner.dismissdate = new Date();
      owner.user.role = [Role.CLIENT];

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
