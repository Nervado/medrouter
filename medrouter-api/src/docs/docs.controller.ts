import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Res,
  Delete,
  Post,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { DocsService } from './docs.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { configService } from 'src/config/config.service';
import { cryptoService } from 'src/crypto/crypto.service';
import { diskStorage } from 'multer';

import { DocDto } from './dto/doc.dto';
import { Exists } from './decorators/exists.decorator';

@Controller('docs')
export class DocsController {
  constructor(private readonly docsService: DocsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(pdf)$/)) {
          return callback(null, false);
        }
        return callback(null, true);
      },
      limits: { fileSize: 1000000 },
      storage: diskStorage({
        destination: configService.getDocsPath(),
        filename: (req, file, cb) => {
          cryptoService.generateFileName(req, file, cb);
        },
      }),
    }),
  )
  uploadDocument(@UploadedFile() file): Promise<DocDto> {
    if (!file) {
      throw new BadRequestException('File type not allowed!');
    }
    const { filename, path } = file;

    console.log(path);

    return this.docsService.create({ filename, path });
  }

  @Get(':docpath')
  @Exists('docpath')
  @UseInterceptors(ClassSerializerInterceptor)
  dowloadDocment(@Param('docpath') filename, @Res() res): Promise<any> {
    return res.sendFile(filename, { root: 'uploads/docs' });
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  delete(@Param('id') id) {
    console.log('Deleting... avatar id', id);
    return this.docsService.delete(id);
  }
}
