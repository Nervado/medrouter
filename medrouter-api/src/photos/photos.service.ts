import { Injectable } from '@nestjs/common';
import { PhotoRepository } from './photos.repository';
import { PhotoDto } from './dto/photo.dto';
import { Photo } from './models/photos.entity';

@Injectable()
export class PhotosService {
  constructor(private photoRepo: PhotoRepository) {}

  async delete(id: any): Promise<any> {
    return this.photoRepo.delete({ id });
  }

  async create(docDto: PhotoDto): Promise<PhotoDto> {
    return this.photoRepo.createOne(docDto);
  }

  async getOne(id: string): Promise<Photo> {
    return await Photo.findOne({ where: { id } });
  }
}
