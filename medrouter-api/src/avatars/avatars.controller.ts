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
  UseGuards,
} from '@nestjs/common';

import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

import { configService } from '../config/config.service';
import { cryptoService } from '../crypto/crypto.service';
import { AvatarsService } from './avatars.service';
import { AvatarDto } from './dto/avatar.dto';

import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { Allow } from 'src/auth/decorators/alow.decorator';

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

  @Delete('/:id')
  //@Allow(Role.CLIENT, Role.ADMIN, Role.CLIENT, Role.CLIENT)
  //@Roles('client')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  delete(@Param('id') id, @GetUser() user: User) {
    console.log('Deleting... avatar id', id);
    return this.avatarService.delete(id, user);
  }
}
