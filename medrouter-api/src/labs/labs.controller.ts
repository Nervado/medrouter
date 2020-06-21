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
import { IntFilterDto } from '../utils/int-filter.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { LabsService } from './labs.service';
import { LabDto } from './dto/lab.dto';
import { SearchLab } from './dto/searchlab.dto';
import { LabChangesDto } from './dto/labStatus-dto';

@Controller('labs')
export class LabsController {
  constructor(private labsService: LabsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createDoctor(@Body(ValidationPipe) body: LabDto) {
    return this.labsService.create(body);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(@Query(ValidationPipe) search: SearchLab) {
    return this.labsService.get(search);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  get(@Param('id') id: number): void {
    //return this.doctorService.getOne(id);
  }

  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  deleteDoctor(@Param('id') id: number) {
    //return this.doctorService.delete(id);
  }

  @Patch('/:id')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: string,
    @Body(ValidationPipe) body: LabChangesDto,
  ) {
    return this.labsService.change(id, body);
  }
}
