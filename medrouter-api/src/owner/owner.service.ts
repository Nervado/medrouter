import { Injectable, BadRequestException } from '@nestjs/common';
import { Owner } from './models/owner.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OwnerRepository } from './owner.repository';
import { OwnerDto } from './dtos/owner-dto';
import { Service } from 'src/utils/generics.service';
import { ManagerDto } from 'src/manager/dto/manager.dto';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { Role } from 'src/auth/enums/role.enum';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';

@Injectable()
export class OwnerService extends Service<
  OwnerDto,
  Owner,
  OwnerRepository,
  number,
  User,
  string
> {
  constructor(
    @InjectRepository(OwnerRepository) repo: OwnerRepository,
    private usersService: UsersService,
  ) {
    super(repo);
  }

  public async create(body: OwnerDto): Promise<Owner> {
    const user = await this.usersService.findOne(body.user.email);

    if (user.role.find(rol => rol === Role.OWNER)) {
      throw new BadRequestException('owner already exists!');
    }

    user.role = [...user.role, Role.OWNER];
    return await this.createOne(body, user);
  }

  public async getAll(search: SearchFilterDto): Promise<Owner[]> {
    return await this.repo.getAll(search);
  }
}
