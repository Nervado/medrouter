import {
  Controller,
  Body,
  Post,
  Put,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  ValidationPipe,
  Query,
  Delete,
  Patch,
} from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorDto } from './dto/doctor.dto';
import { Doctor } from './models/doctor.entity';

import { IntFilterDto } from '../utils/int-filter.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('doctors')
export class DoctorsController {
  constructor(private readonly doctorService: DoctorsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createDoctor(@Body(ValidationPipe) body: DoctorDto): Promise<Doctor> {
    return this.doctorService.create(body);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(@Query(ValidationPipe) page: IntFilterDto): Promise<Doctor[]> {
    return this.doctorService.getMany(page.page);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  get(@Param('id') id: number): Promise<Doctor> {
    return this.doctorService.getOne(id);
  }

  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  deleteDoctor(@Param('id') id: number) {
    return this.doctorService.delete(id);
  }

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: number,
    @Body('specialty', ValidationPipe) body: DoctorDto,
  ) {
    return this.doctorService.updateOne(id, body);
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: number,
    @Body('status', ValidationPipe) body: DoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.modifyOne(id, body, 'status');
  }

  @Patch('/:id/diff')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeSalary(
    @Param('id') id: number,
    @Body('diff', ValidationPipe) body: DoctorDto,
  ): Promise<Doctor> {
    return this.doctorService.modifyOne(id, body, 'diff');
  }
}
