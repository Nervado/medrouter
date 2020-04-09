import { Repository, EntityRepository } from 'typeorm';

import { Avatar } from './models/avatar.entity';
import { AvatarDto } from './dto/avatar.dto';
import { BadRequestException } from '@nestjs/common';

@EntityRepository(Avatar)
export class AvatarRepository extends Repository<Avatar> {
  async createOne(avatarDto: AvatarDto): Promise<AvatarDto> {
    const avatar = new Avatar();
    this.merge(avatar, avatarDto);
    return avatar.save();
  }

  async check(filename: string): Promise<any> {
    const result = await this.findOne({ where: { filename } });
    if (!result) {
      throw new BadRequestException('Avatar unavailable!');
    }
    return result;
  }
}
