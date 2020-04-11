import { Module } from '@nestjs/common';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';

@Module({
  controllers: [LabsController],
  providers: [LabsService]
})
export class LabsModule {}
