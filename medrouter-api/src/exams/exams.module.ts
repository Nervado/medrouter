import { Module } from '@nestjs/common';
import { ExamsController } from './exams.controller';
import { ExamsService } from './exams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './models/exam.entity';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Exam]), PrescriptionsModule],
  controllers: [ExamsController],
  providers: [ExamsService],
})
export class ExamsModule {}
