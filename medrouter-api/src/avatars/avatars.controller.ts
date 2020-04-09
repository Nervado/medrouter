import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Get,
  Param,
  Res,
  ClassSerializerInterceptor,
  Delete,
} from '@nestjs/common';

import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

import { configService } from '../config/config.service';
import { cryptoService } from '../crypto/crypto.service';
import { AvatarsService } from './avatars.service';
import { AvatarDto } from './dto/avatar.dto';

@Controller('avatars')
export class AvatarsController {
  constructor(private readonly avatarService: AvatarsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(
    FileInterceptor('avatar', {
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return callback(null, false);
        }
        return callback(null, true);
      },
      limits: { fileSize: 2000000 },
      storage: diskStorage({
        destination: configService.getAvatarsPath(),
        filename: (req, file, cb) => {
          cryptoService.generateFileName(req, file, cb);
        },
      }),
    }),
  )
  uploadAvatar(@UploadedFile() file): Promise<AvatarDto> {
    const { filename, path } = file;
    return this.avatarService.create({ filename, path });
  }

  @Get(':avatarpath')
  @UseInterceptors(ClassSerializerInterceptor)
  dowloadAvatar(@Param('avatarpath') image, @Res() res) {
    this.avatarService.check(image, res);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete('/:id')
  delete(@Param('id') id) {
    console.log('Deleting... avatar id', id);
    return this.avatarService.delete(id);
  }
}
