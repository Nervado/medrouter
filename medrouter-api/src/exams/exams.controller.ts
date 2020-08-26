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
  UseGuards,
} from '@nestjs/common';
import { IntFilterDto } from '../utils/int-filter.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

import { ExamsService } from './exams.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('exams')
export class ExamsController {
  constructor(private examsService: ExamsService) {}

  @Post()
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  createDoctor(@Body(ValidationPipe) body: any, @GetUser() user: User) {
    return this.examsService.create(body, user);
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
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  deleteExam(@Param('id') id: string) {
    return this.examsService.delete(id);
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
