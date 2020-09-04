import { ExamsEnum } from '../enums/exams.enum';
import { ExamStatus } from '../enums/status.enum';
import { LabDto } from 'src/labs/dto/lab.dto';
import { DocDto } from 'src/docs/dto/doc.dto';
import { ClientDto } from 'src/client/dtos/cliente-dto';
import { DoctorDto } from 'src/doctors/dto/doctor.dto';
import { IsOptional, IsUUID, IsNumber, IsString } from 'class-validator';
import { isNumber } from 'util';
import { PhotoDto } from 'src/photos/dto/photo.dto';

export class ExamDto {
  @IsUUID()
  id: string;

  code?: string;

  @IsOptional()
  @IsUUID()
  prescriptionId?: string;

  @IsOptional()
  price: number;

  type?: ExamsEnum;

  status?: ExamStatus;

  deadline?: number;

  docs?: DocDto[];

  photos?: PhotoDto[];

  lab?: LabDto;

  createdAt?: Date;

  client?: {
    id: string;
    user: {
      username: string;
      surname: string;
      fullname: string;
      avatar: {
        url: string;
      };
    };
  };

  doctor?: {
    id: string;
    user: {
      username: string;
      surname: string;
      fullname: string;
      avatar: {
        url: string;
      };
    };
  };
}
