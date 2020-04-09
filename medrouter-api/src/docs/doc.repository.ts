import { Repository, EntityRepository } from 'typeorm';

import { Doc } from './models/doc.entity';
import { DocDto } from './dto/doc.dto';

@EntityRepository(Doc)
export class DocRepository extends Repository<Doc> {
  async createOne(docDto: DocDto): Promise<DocDto> {
    const doc = new Doc();
    this.merge(doc, docDto);
    return doc.save();
  }
}
