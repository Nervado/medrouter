import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.entity';
import { AuthSingUpDto } from '../auth/dto/auth-signup.dto';
import { PageFilterDto } from './dto/page-filter.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { Address } from 'src/address/models/address.entity';
import { Role } from 'src/auth/enums/role.enum';
import { AuthPasswordChange } from 'src/auth/dto/auth-password-change.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async changePassword(newPass: AuthPasswordChange, user: User): Promise<User> {
    const { password, newPassword, passwordConfirmation } = newPass;

    if (newPassword !== passwordConfirmation || password === newPassword) {
      throw new BadRequestException('Old password can not be used');
    }

    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(newPassword, user.salt);

    try {
      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException('Uknow error!');
    }
  }

  async signUp(authSingUpDto: AuthSingUpDto): Promise<User> {
    const {
      email,
      password,
      username,
      passwordConfirmation,
      phoneNumber,
      surname,
      cpf,
    } = authSingUpDto;

    if (!(passwordConfirmation && passwordConfirmation === password)) {
      throw new BadRequestException('Passwords dont match');
    }

    const user = new User();

    user.username = username;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.surname = surname;
    user.cpf = cpf;

    user.role = [Role.USER];
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      return await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException('Uknow error!');
      }
    }
  }

  async validateUser(loginDto: any): Promise<any> {
    const { username, password } = loginDto;

    try {
      const user = await this.findOne({
        where: { email: username },
      });

      if (user && (await user.validatePassword(password))) {
        return user;
      }

      return null;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async searchByName(searchFilterDto: any): Promise<User[]> {
    const { page, username, sex, role, checked } = searchFilterDto;

    const pageNumber: number = page ? page * 10 - 10 : 0;

    const query = this.createQueryBuilder('user');

    if (username) {
      query.andWhere(`username ILIKE '%${username}%'`);
    }

    if (sex) {
      query.andWhere('sex = :sex', { sex });
    }

    if (role) {
      query.andWhere('role @> (:role)', { role: [role] });
    }

    if (checked) {
      query.andWhere('checked = :checked', { checked });
    }
    const users = await query
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.address', 'address')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return users;
  }

  async index(pageFilterDto: PageFilterDto): Promise<User[]> {
    const pageNumber: number = pageFilterDto.page * 10 - 10;
    const users = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .leftJoinAndSelect('user.address', 'address')
      .skip(pageNumber)
      .take(10)
      .getMany();

    return users;
  }

  async updateOne(
    id: string,
    updateUserDto: UserUpdateDto,
    address?: Address,
  ): Promise<User> {
    const user = await this.findOne(id);
    if (user.address === null) {
      user.address = address;
    }
    //user.address = address;
    this.merge(user, updateUserDto);

    try {
      return await user.save();
    } catch (error) {
      if (error.code === '23505') {
        console.log(error);
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException('Uknow error here!');
      }
    }
  }
}
