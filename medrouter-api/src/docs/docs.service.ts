import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as PdfPrinter from 'pdfmake';

import { DocRepository } from './doc.repository';
import { DocDto } from './dto/doc.dto';

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

  async delete(id: number): Promise<any> {
    return this.docRepository.delete({ docId: id });
  }

  async create(docDto: DocDto): Promise<DocDto> {
    return this.docRepository.createOne(docDto);
  }
}
