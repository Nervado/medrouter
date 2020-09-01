import { Injectable, BadRequestException } from '@nestjs/common';
import { PhotoRepository } from './photos.repository';
import { PhotoDto } from './dto/photo.dto';
import { Photo } from './models/photos.entity';
import { ExamStatus } from 'src/exams/enums/status.enum';

@Injectable()
export class PhotosService {
  constructor(private photoRepo: PhotoRepository) {}

  async delete(id: any): Promise<any> {
    const query = this.photoRepo.createQueryBuilder('photp');

    query.andWhere('documents.id = :id', { id });

    query.andWhere('exam.status = :status OR exam.status = :status2', {
      status: ExamStatus.CONCLUDED,
      status2: ExamStatus.AVAILABLE,
    });

    const file = await query
      .leftJoinAndSelect('documents.exam', 'exam')
      .getOne();

    if (file) {
      throw new BadRequestException('File cannot be erased anymore');
    }

    return this.photoRepo.delete({ id });
  }

  async create(docDto: PhotoDto): Promise<PhotoDto> {
    return this.photoRepo.createOne(docDto);
  }

  async getOne(id: string): Promise<Photo> {
    return await Photo.findOne({ where: { id } });
  }
}
