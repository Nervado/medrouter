import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { AddressDto } from './dto/adress.dto';
import { Address } from './models/address.entity';
import { User } from 'src/users/models/user.entity';
import { AddressRepository } from './address.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressRepository) private addressRepo: AddressRepository,
  ) {}
  async createAddress(addressDto: AddressDto): Promise<Address> {
    const address = new Address();
    Address.merge(address, addressDto);
    try {
      await address.save();
    } catch (error) {
      throw new InternalServerErrorException('Failed to create adddress');
    }
    return address;
  }

  async get(id: any): Promise<Address> {
    return await Address.findOne(id);
  }

  async update(addressDto: AddressDto): Promise<Address> {
    const current = await Address.findOne(addressDto.id);

    if (!current) {
      throw new NotFoundException('Address not found');
    }

    Address.merge(current, addressDto);

    try {
      return await current.save();
    } catch (error) {
      throw new InternalServerErrorException('Enable to update Address');
    }
  }

  async delete(id: number, user?: User): Promise<any> {
    if (user && user.address !== null) {
      //user.address = null;
      try {
        await user.save();
      } catch (error) {
        throw new InternalServerErrorException('Fail to delete');
      }
    }
    return this.addressRepo.softDelete({ id });
  }
}
