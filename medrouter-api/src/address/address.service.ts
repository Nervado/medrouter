import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Address } from './models/address.entity';
import { AddressDto } from './dto/adress.dto';

@Injectable()
export class AddressService {
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
}
