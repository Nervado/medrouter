import { Injectable } from '@nestjs/common';
import { AvatarRepository } from './avatar.repository';
import { AvatarDto } from './dto/avatar.dto';

@Injectable()
export class AvatarsService {
  constructor(private avatarsRepo: AvatarRepository) {}

  async create(avatarDto: AvatarDto): Promise<AvatarDto> {
    return this.avatarsRepo.createOne(avatarDto);
  }

  async delete(id: number): Promise<any> {
    return this.avatarsRepo.delete({ avatarId: id });
  }

  async check(filename: string, res): Promise<any> {
    return this.avatarsRepo
      .check(filename)
      .then(() => res.sendFile(filename, { root: 'uploads/avatars' }))
      .catch(() => res.status(404).json({ error: 'Avatar not found' }));
  }
}
