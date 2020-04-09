import { Controller, Get } from '@nestjs/common';

@Controller('photos')
export class PhotosController {
  @Get()
  getAll() {
    return { all: 'all' };
  }
}
