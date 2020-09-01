import { Injectable, BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';

import { DocRepository } from './doc.repository';
import { DocDto } from './dto/doc.dto';
import { Doc } from './models/doc.entity';
import { ExamStatus } from 'src/exams/enums/status.enum';

@Injectable()
export class DocsService {
  constructor(private docRepository: DocRepository) {}

  // create pdf register
  private createPDf(options, docDefinition, fonts) {
    const printer = new PdfPrinter(fonts);
    const fileName = uuidv4() + '.pdf';
    console.log(fileName);
    const pdfDoc = printer.createPdfKitDocument(docDefinition, options);
    pdfDoc.pipe(fs.createWriteStream(`uploads/docs/${fileName}`));
    pdfDoc.end();
    return { fileName: fileName };
  }

  async delete(id: any): Promise<any> {
    const query = this.docRepository.createQueryBuilder('documents');

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

    return this.docRepository.delete({ id });
  }

  async create(docDto: DocDto): Promise<DocDto> {
    return this.docRepository.createOne(docDto);
  }

  async getOne(id: string): Promise<Doc> {
    return await Doc.findOne({ where: { id } });
  }
}
