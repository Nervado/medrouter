import { Repository, EntityRepository } from 'typeorm';

import { Address } from './models/address.entity';

@EntityRepository(Address)
export class AddressRepository extends Repository<Address> {}
