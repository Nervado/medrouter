import { Repository, EntityRepository } from 'typeorm';

import { Doc } from './models/doc.entity';
import { DocDto } from './dto/doc.dto';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Doc)
export class DocRepository extends Repository<Doc> {
  async createOne(docDto: DocDto): Promise<DocDto> {
    const doc = new Doc();
    this.merge(doc, docDto);

    try {
      return await doc.save();
    } catch (error) {
      throw new InternalServerErrorException('Fail at save doc metadata');
    }
  }
}
