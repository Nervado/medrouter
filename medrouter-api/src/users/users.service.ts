import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { PageFilterDto } from './dto/page-filter.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from './models/user.entity';
import { AuthSingUpDto } from '../auth/dto/auth-signup.dto';
import { EmailsService } from '../emails/emails.service';
import { EmailTypes } from '../emails/enums/email-types';
import { EmailsGroups } from '../emails/enums/emails-groups';
import { AddressService } from '../address/address.service';
import { Role } from 'src/auth/enums/role.enum';
import { throws } from 'assert';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private emailsService: EmailsService,
    private addressService: AddressService,
  ) {}

  async index(pageFilterDto: PageFilterDto) {
    return this.userRepository.index(pageFilterDto);
  }

  async get(id, user: User): Promise<User> {
    if (id !== user.userId && !user.admin && !user.recept) {
      throw new UnauthorizedException('User has not correct privileges');
    }
    return this.userRepository.findOne(id);
  }

  async update(
    id: number,
    userUpdateDto: UserUpdateDto,
    user?: User,
  ): Promise<User> {
    if (user.userId !== id && !user.admin && !user.owner && !user.recept) {
      throw new UnauthorizedException('User has not correct privileges');
    }
    if (!userUpdateDto.address) {
      return await this.userRepository.updateOne(id, userUpdateDto);
    }
    const address = await this.addressService.createAddress(
      userUpdateDto.address,
    );
    return await this.userRepository.updateOne(id, userUpdateDto, address);
  }

  async signUp(authSingUpDto: AuthSingUpDto): Promise<User> {
    const newuser = await this.userRepository.signUp(authSingUpDto);
    newuser &&
      (await this.emailsService.sendEmail(
        authSingUpDto,
        EmailTypes.WELLCOME,
        EmailsGroups.CLIENTS,
      )) &&
      (await this.emailsService.sendEmail(
        authSingUpDto,
        EmailTypes.SUBSCRIBE,
        EmailsGroups.ADMINS,
      ));
    return newuser;
  }

  async validateUser(loginDto: any): Promise<User> {
    return this.userRepository.validateUser(loginDto);
  }

  async findOne(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException('User not found!');
    }

    return user;
  }

  async deleteOne(id: number, user: User): Promise<any> {
    console.log(user);
    if (id !== user.userId && !user.admin && !user.owner) {
      throw new UnauthorizedException('User has not privillegs to exec');
    }
    this.userRepository.softDelete({ userId: id });
  }

  async resetRole(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ userId: id });
    user.role = [Role.CLIENT];
    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Fail do reset role');
    }
  }
}
