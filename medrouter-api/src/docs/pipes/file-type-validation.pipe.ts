import { PipeTransform, BadRequestException } from '@nestjs/common';
import { FileType } from '../enums/file-type';

import { extname } from 'path';

export class FileTypeValidationPipe implements PipeTransform {
  readonly allowedTypes = [FileType.PDF];

  transform(value: any) {
    console.log(value);
    const extension = extname(value.filename).toUpperCase();

    if (!this.isExtensionIsValid(extension)) {
      throw new BadRequestException(`"${value}" is an invalid type`);
    }

    return value;
  }

  private isExtensionIsValid(status: any) {
    const idx = this.allowedTypes.indexOf(status);
    return idx !== -1;
  }
}
