import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  BadRequestException,
  UploadedFile,
  Delete,
  Param,
  Res,
} from '@nestjs/common';
import { PhotosService } from './photos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { configService } from 'src/config/config.service';
import { cryptoService } from 'src/crypto/crypto.service';
import { PhotoDto } from './dto/photo.dto';
import { diskStorage } from 'multer';
//import { Exists } from './decorators/exists.decorator';

@Controller('photos')
export class PhotosController {
  constructor(private readonly photoService: PhotosService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        return callback(null, true);
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: configService.getImagesPath(),
        filename: (req, file, cb) => {
          cryptoService.generateFileName(req, file, cb);
        },
      }),
    }),
  )
  uploadDocument(@UploadedFile() file): Promise<PhotoDto> {
    if (!file) {
      throw new BadRequestException('File type not allowed!');
    }
    const { filename, path } = file;

    return this.photoService.create({ filename, path });
  }

  @Get(':photoPath')
  //@Exists('photoPath')
  @UseInterceptors(ClassSerializerInterceptor)
  dowloadDocment(@Param('photoPath') filename, @Res() res): Promise<any> {
    return res.sendFile(filename, { root: 'uploads/images' }); //controler path
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  delete(@Param('id') id) {
    return this.photoService.delete(id);
  }
}
