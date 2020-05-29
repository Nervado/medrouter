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
import { configService } from 'src/config/config.service';
import * as Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { AuthPasswordChange } from '../auth/dto/auth-password-change.dto';
import { AvatarsService } from 'src/avatars/avatars.service';
import { nXorNull } from 'src/utils/logic';

@Injectable()
export class UsersService {
  private redisconfig = configService.getRedisConfig();
  private redis = new Redis(
    parseInt(this.redisconfig.port),
    this.redisconfig.host,
  );

  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private emailsService: EmailsService,
    private addressService: AddressService,
    private avatarsService: AvatarsService,
  ) {}

  async index(pageFilterDto: PageFilterDto) {
    return this.userRepository.index(pageFilterDto);
  }

  async get(id, user: User): Promise<User> {
    if (id !== user.userId && user.role.length === 1) {
      //remove after testes
      // throw new UnauthorizedException('User has not privileges here');
    }

    if (id !== user.userId && user.role.length > 1) {
      return this.userRepository.findOne(id);
    }
    //**testes */
    return this.userRepository.findOne(id);

    return this.userRepository.findOne(user.userId);
  }

  async update(
    id: number,
    userUpdateDto: UserUpdateDto,
    logged?: User,
  ): Promise<User> {
    console.log(id);

    if (logged.userId !== id && logged.role.length === 1) {
      //Uncommnent after tests
      //throw new UnauthorizedException('Not authorized');
    }
    if (logged.userId === id) {
      // logged user whant update self data
      console.log('logged user whant update self data');
    }

    if (logged.userId !== id) {
      // admin user whats to perform user update data
      console.log('admin user whats to perform user update data');
    }

    const user: User = await this.userRepository.findOne({ userId: id });

    // no address or has address
    if (nXorNull(user.address, userUpdateDto.address)) {
      if (user.address !== null) {
        const address = await this.addressService.update(
          userUpdateDto.address,
          user.address.id,
        );
        return await this.userRepository.updateOne(id, userUpdateDto, address);
      }

      return await this.userRepository.updateOne(id, userUpdateDto);
    }

    // if not has address must create
    if (user.address === null && userUpdateDto.address.streetName !== null) {
      const address = await this.addressService.createAddress(
        userUpdateDto.address,
      );
      return await this.userRepository.updateOne(id, userUpdateDto, address);
    }
  }

  async signUp(authSingUpDto: AuthSingUpDto): Promise<User> {
    const newuser = await this.userRepository.signUp(authSingUpDto);
    const { password } = authSingUpDto;
    const { username, phoneNumber, email, userId } = newuser;
    const confirmationToken = uuidv4();

    try {
      await this.redis.set(confirmationToken, userId);
    } catch (error) {
      throw new InternalServerErrorException(
        'Fail to set confirmation token...',
        error,
      );
    }

    const data = {
      username,
      phoneNumber,
      password,
      email,
      link: this.setConfirmationLink(confirmationToken),
    };
    newuser &&
      (await this.emailsService.sendEmail(
        data,
        EmailTypes.WELLCOME,
        EmailsGroups.CLIENTS,
      )) &&
      (await this.emailsService.sendEmail(
        data,
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
    const usertoBeDeleted = await this.userRepository.findOne({
      where: { userId: id },
    });
    console.log(user);
    if (id !== user.userId && !user.admin && !user.owner) {
      throw new UnauthorizedException('User has not privillegs to exec');
    }

    if (usertoBeDeleted.address !== null) {
      await this.avatarsService.delete(
        usertoBeDeleted.avatar.avatarId,
        usertoBeDeleted,
      );
    }

    if (usertoBeDeleted.avatar !== null) {
      await this.addressService.delete(
        usertoBeDeleted.address.id,
        usertoBeDeleted,
      );
    }

    return this.userRepository.softDelete({ userId: id });
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

  async setRole(id: number, role: string): Promise<User> {
    const user = await this.userRepository.findOne({ userId: id });

    if (role === Role.CLIENT) {
      user.role = user.role.filter(role => role !== Role.USER);
      user.role = [...user.role, Role.CLIENT];
    }

    if (role !== Role.CLIENT) {
      user.role = [...user.role, Role.CLIENT];
    }

    try {
      return await this.userRepository.save(user);
    } catch (error) {
      throw new InternalServerErrorException('Fail do set role');
    }
  }

  setConfirmationLink(token: string): string {
    return `${configService.getServerUrl()}/auth/confirmation/${token}`;
  }

  async changePassword(newPass: AuthPasswordChange, user: User): Promise<User> {
    return this.userRepository.changePassword(newPass, user);
  }
}
