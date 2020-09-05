import { Exam } from 'src/exams/models/exam.entity';
import { Medicine } from 'src/medicines/models/medicine.entity';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';
import { ParseIntPipe } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { ExamDto } from 'src/exams/dto/exam.dto';
import { MedicineDto } from 'src/medicines/dto/medicine.dto';
import { Specialty } from 'src/doctors/enums/specialty.enum';

export class PrescriptionDto {
  id?: string;
  recomendations?: any[];

  @IsOptional()
  exams?: ExamDto[];
  medicines?: Medicine[];
  createdAt?: Date;

  @IsOptional()
  @Transform(value => parseInt(value) || 0)
  waist?: number;

  @IsOptional()
  @Transform(value => parseInt(value) || 0)
  height?: number;

  @IsOptional()
  @Transform(value => parseInt(value) || 0)
  bpm?: number;

  @IsOptional()
  @Transform(value => parseInt(value) || 0)
  weight?: number;

  @IsOptional()
  @IsString()
  pressure?: string;

  client?: {
    id?: string;
    user?: {
      username?: string;
      fullname?: string;
      surname?: string;
      birthdate?: Date;
      avatar?: {
        url: string;
      };
    };
  };

  doctor?: {
    specialty?: Specialty[];
    id: string;
    user: {
      username: string;
      fullname: string;
      surname: string;
      avatar: {
        url: string;
      };
    };
  };
  code?: number;
}
