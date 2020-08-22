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
  @IsNumber()
  @Transform(value => parseInt(value))
  waist?: number;

  @IsOptional()
  @Transform(value => parseInt(value))
  @IsNumber()
  height?: number;

  @IsOptional()
  @Transform(value => parseInt(value))
  @IsNumber()
  bpm?: number;

  @IsOptional()
  @IsNumber()
  @Transform(value => parseInt(value))
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
