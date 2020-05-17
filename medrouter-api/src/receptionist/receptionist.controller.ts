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

import { ReceptionistService } from './receptionist.service';
@Controller('receptionists')
export class ReceptionistController {
  constructor(private receptionistService: ReceptionistService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  createDoctor(@Body(ValidationPipe) body: any) {
    // return this.doctorService.create(body);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(@Query(ValidationPipe) page: IntFilterDto) {
    // return this.doctorService.getMany(page.page);
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

  @Put('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: number,
    @Body('specialty', ValidationPipe) body: any,
  ) {
    // return this.doctorService.updateOne(id, body);
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: number,
    @Body('status', ValidationPipe) body: any,
  ) {
    //return this.doctorService.modifyOne(id, body, 'status');
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  modifyPath(
    @Param('id') id: number,
    @Body('status', ValidationPipe) body: any,
  ) {
    //return this.doctorService.modifyOne(id, body, 'status');
  }
}
