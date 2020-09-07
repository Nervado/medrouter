import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AvatarRepository } from './avatar.repository';
import { AvatarDto } from './dto/avatar.dto';
import { User } from 'src/users/models/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AvatarsService {
  constructor(
    @InjectRepository(AvatarRepository) private avatarsRepo: AvatarRepository,
  ) {}

  async create(avatarDto: AvatarDto): Promise<AvatarDto> {
    return this.avatarsRepo.createOne(avatarDto);
  }

  async delete(id: string, user?: User): Promise<any> {
    if (user && user.avatar !== null) {
      //user.avatar = null;
      try {
        await user.save();
      } catch (error) {
        throw new InternalServerErrorException('Fail to delete');
      }
    }
    return this.avatarsRepo.softDelete({ avatarId: id });
  }

  async check(filename: string, res): Promise<any> {
    return this.avatarsRepo
      .check(filename)
      .then(() => res.sendFile(filename, { root: 'uploads/avatars' }))
      .catch(() => res.status(404).json({ error: 'Avatar not found' }));
  }
}
