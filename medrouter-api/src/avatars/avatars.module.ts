import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvatarRepository } from './avatar.repository';
import { AvatarsController } from './avatars.controller';
import { AvatarsService } from './avatars.service';

@Module({
  imports: [TypeOrmModule.forFeature([AvatarRepository])],
  controllers: [AvatarsController],
  providers: [AvatarsService],
})
export class AvatarsModule {}
