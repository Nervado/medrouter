import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './models/exam.entity';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';
import { LabsModule } from 'src/labs/labs.module';
import { PhotosModule } from 'src/photos/photos.module';
import { DocsModule } from 'src/docs/docs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Exam]),
    PrescriptionsModule,
    LabsModule,
    PhotosModule,
    DocsModule,
  ],
  controllers: [ExamsController],
  providers: [ExamsService],
  exports: [ExamsService],
})
export class ExamsModule {}
