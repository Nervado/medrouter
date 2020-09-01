import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Param,
  ValidationPipe,
  Query,
  Delete,
  Patch,
  UseGuards,
  Put,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ExamsService } from './exams.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { Role } from 'src/auth/enums/role.enum';
import { SearchClientDto } from 'src/client/dtos/search-client-dto';
import { ExamStatusDto } from './dto/exam-status.dto';
import { ExamDto } from './dto/exam.dto';

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
  @Roles(Role.LAB)
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(
    @Query(ValidationPipe) search: SearchClientDto,
    @GetUser() user: User,
  ) {
    return this.examsService.getAll(undefined, search, user);
  }

  @Get('/:code')
  @Roles(Role.LAB)
  @UseInterceptors(ClassSerializerInterceptor)
  get(@Param('code') code: string): Promise<ExamDto> {
    return this.examsService.getOne(code);
  }

  @Delete('/:id')
  @Roles('doctor')
  @UseInterceptors(ClassSerializerInterceptor)
  deleteExam(@Param('id') id: string) {
    return this.examsService.delete(id);
  }

  @Patch('/:id')
  @Roles(Role.LAB)
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: string,
    @Body() body: ExamStatusDto,
    @GetUser() user: User,
  ) {
    return this.examsService.changeStatus(id, body, user);
  }

  @Put('/:id')
  @Roles(Role.LAB)
  @UseInterceptors(ClassSerializerInterceptor)
  update(
    @Param('id') id: string,
    @Body() exam: ExamDto,
    @GetUser() user: User,
  ) {
    return this.examsService.update(id, exam, user);
  }
}
