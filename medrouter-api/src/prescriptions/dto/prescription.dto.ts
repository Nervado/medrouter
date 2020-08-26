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

export class PrescriptionDto {
  id?: string;
  recommendations?: string[];
  exams?: Exam[];
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
      avatar?: {
        url: string;
      };
    };
  };

  doctor?: {
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
