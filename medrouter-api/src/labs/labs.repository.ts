import { Repository, EntityRepository } from 'typeorm';
import { Lab } from './models/lab.entity';
import { SearchLab } from './dto/searchlab.dto';
import { User } from 'src/users/models/user.entity';
import { InternalServerErrorException } from '@nestjs/common';
import { Role } from 'src/auth/enums/role.enum';
import { ExamsEnum } from 'src/exams/enums/exams.enum';
import { LabCategory } from './enums/category.enum';

@EntityRepository(Lab)
export class LabsRepository extends Repository<Lab> {
  async search(search: SearchLab): Promise<Lab[]> {
    const { page, name } = search;
    const pageNumber = page * 10 - 10;
    const query = this.createQueryBuilder('lab');

    if (name) {
      query.andWhere(`name ILIKE '%${name}%'`);
    }
    const labs = await query
      .leftJoinAndSelect('lab.users', 'users')
      .skip(pageNumber)
      .take(10)
      .orderBy('lab.available', 'DESC')
      .getMany();

    return labs;
  }

  async updateStatusOrUsers(
    lab: Lab,
    user?: User,
    available?: boolean,
    users?: User[],
    exams?: ExamsEnum[],
    labcategory?: LabCategory[],
  ): Promise<Lab> {
    if (available !== undefined) {
      lab.available = available;
    }

    if (exams) {
      lab.exams = [...exams];
    }

    if (labcategory) {
      lab.labcategory = [...labcategory];
    }

    if (users && lab.available === true) {
      lab.users = lab.users.filter(
        user => !users.find(u => u.userId === user.userId),
      );
    }

    if (
      user &&
      !user.role.find(rol => rol === Role.LAB) &&
      lab.available === true
    ) {
      user.role = [...user.role, Role.LAB];
      lab.users = [...lab.users, user];
    }

    try {
      await lab.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail to update lab', error);
    }
    return lab;
  }
}
