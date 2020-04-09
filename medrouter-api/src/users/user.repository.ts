import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './models/user.entity';
import { AuthSingUpDto } from '../auth/dto/auth-signup.dto';
import { LoginDto } from '../auth/dto/auth-login.dto';
import { PageFilterDto } from './dto/page-filter.dto';
import { UserUpdateDto } from './dto/user-update.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authSingUpDto: AuthSingUpDto): Promise<User> {
    const {
      email,
      password,
      username,
      passwordConfirmation,
      phoneNumber,
      surname,
    } = authSingUpDto;

    if (!(passwordConfirmation && passwordConfirmation === password)) {
      throw new BadRequestException('Passwords dont match');
    }

    const user = new User();
    user.username = username;
    user.email = email;
    user.phoneNumber = phoneNumber;
    user.surname = surname;
    user.ispro = false;
    user.admin = false;

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

      console.log(user);

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

  async index(pageFilterDto: PageFilterDto): Promise<User[]> {
    const pageNumber: number = pageFilterDto.page * 5 - 5;
    const users = await this.createQueryBuilder('user')
      .leftJoinAndSelect('user.avatar', 'avatar')
      .skip(pageNumber)
      .take(5)
      .getMany();

    return users;
  }

  async updateOne(id: number, updateUserDto: UserUpdateDto): Promise<User> {
    const user = await this.findOne(id);
    this.merge(user, updateUserDto);
    return await this.save(user);
  }
}
