import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Service } from 'src/utils/generics.service';
import { ReceptionistDto } from './dto/receptionist.dto';
import { Receptionist } from './models/receptionist.entity';
import { ReceptionistRepository } from './receptionist.repository';
import { User } from 'src/users/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class ReceptionistService extends Service<
  ReceptionistDto,
  Receptionist,
  ReceptionistRepository,
  any,
  User,
  string
> {
  constructor(
    @InjectRepository(ReceptionistRepository) repo: ReceptionistRepository,
    private usersService: UsersService,
  ) {
    super(repo);
  }

  public async create(body: ReceptionistDto): Promise<Receptionist> {
    const user = await this.usersService.findOne(body.user.email);

    if (user.role.find(rol => rol === Role.RECEPT)) {
      throw new BadRequestException('receptionist already exists!');
    }

    user.role = [...user.role, Role.RECEPT];
    return await this.repo.createOne(body, user);
  }

  public async getAll(search: SearchFilterDto): Promise<Receptionist[]> {
    return await this.repo.getAll(search);
  }

  async delete(id: string) {
    const receptionist = await this.getOne(id);
    try {
      await this.usersService.resetRole(receptionist.user.userId);
      return this.repo.softDelete({ id });
    } catch (error) {
      throw new InternalServerErrorException('Fail operation:delete');
    }
  }
}
