import { Module } from '@nestjs/common';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lab } from './models/lab.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Lab])],
  controllers: [LabsController],
  providers: [LabsService],
})
export class LabsModule {}
