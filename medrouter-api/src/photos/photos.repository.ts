import { Repository, EntityRepository } from 'typeorm';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';

import { Photo } from './models/photos.entity';

import { PhotoDto } from './dto/photo.dto';

@EntityRepository(Photo)
export class PhotoRepository extends Repository<Photo> {
  async createOne(photoDto: PhotoDto): Promise<PhotoDto> {
    const photo = new Photo();

    this.merge(photo, photoDto);

    try {
      return await photo.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail at save photo metadata');
    }
  }

  async check(filename: string): Promise<any> {
    const result = await this.findOne({ where: { filename } });
    if (!result) {
      throw new BadRequestException('Photo unavailable!');
    }
    return result;
  }
}
