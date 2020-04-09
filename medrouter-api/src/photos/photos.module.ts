import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { PhotoRepository } from './photos.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PhotoRepository])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}
