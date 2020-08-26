import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ExamDto } from './dto/exam.dto';
import { Exam } from './models/exam.entity';
import { PrescriptionsService } from 'src/prescriptions/prescriptions.service';
import { User } from 'src/users/models/user.entity';
import { ExamsEnum } from './enums/exams.enum';
import { ExamStatus } from './enums/status.enum';

@Injectable()
export class ExamsService {
  constructor(private ps: PrescriptionsService) {}

  async create(examdto: ExamDto, user: User): Promise<void> {
    const prescription = await this.ps.findById(examdto.prescriptionId);

    if (!prescription) {
      throw new BadRequestException('Prescription not exists!');
    }

    if (user.userId !== prescription.doctor.user.userId) {
      throw new UnauthorizedException('Not allowed');
    }

    const exam = new Exam();

    exam.prescription = prescription;
    exam.client = prescription.client;
    exam.doctor = prescription.doctor;

    Exam.merge(exam, examdto);

    try {
      await exam.save();
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException('Creation of exam has fail');
    }
  }

  async delete(id: string): Promise<void> {
    console.log('Removing', id);

    const exam = await Exam.findOne(id);

    if (exam.status !== ExamStatus.REQUEST) {
      throw new BadRequestException('Exam cannot be canceled');
    }

    exam.status = ExamStatus.CANCELED;

    try {
      await exam.save();
      //await Exam.getRepository().softDelete(id);
    } catch (error) {
      throw new InternalServerErrorException('fail to delete exam');
    }
  }
}
