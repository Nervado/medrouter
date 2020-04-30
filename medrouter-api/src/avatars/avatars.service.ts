import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AvatarRepository } from './avatar.repository';
import { AvatarDto } from './dto/avatar.dto';
import { User } from 'src/users/models/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AvatarsService {
  constructor(
    private avatarsRepo: AvatarRepository,
    private usersService: UsersService,
  ) {}

  async create(avatarDto: AvatarDto): Promise<AvatarDto> {
    return this.avatarsRepo.createOne(avatarDto);
  }

  async delete(id: number, user?: User): Promise<any> {
    if (user && user.avatar !== null) {
      user.avatar = null;
      try {
        await user.save();
      } catch (error) {
        throw new InternalServerErrorException('Fail to delete');
      }
    }
    return this.avatarsRepo.delete({ avatarId: id });
  }

  async check(filename: string, res): Promise<any> {
    return this.avatarsRepo
      .check(filename)
      .then(() => res.sendFile(filename, { root: 'uploads/avatars' }))
      .catch(() => res.status(404).json({ error: 'Avatar not found' }));
  }
}
