import { ExamsEnum } from '../enums/exams.enum';
import { ExamStatus } from '../enums/status.enum';
import { LabDto } from 'src/labs/dto/lab.dto';
import { DocDto } from 'src/docs/dto/doc.dto';
import { ClientDto } from 'src/client/dtos/cliente-dto';
import { DoctorDto } from 'src/doctors/dto/doctor.dto';
import { IsOptional, IsUUID, IsNumber } from 'class-validator';
import { isNumber } from 'util';

export class ExamDto {
  @IsOptional()
  @IsUUID()
  prescriptionId: string;

  @IsNumber()
  price: number;

  type: ExamsEnum;

  status: ExamStatus;

  deadline: number;

  docs: DocDto[];

  lab: LabDto;
}
