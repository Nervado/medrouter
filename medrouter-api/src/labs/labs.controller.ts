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
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { LabsService } from './labs.service';
import { LabDto } from './dto/lab.dto';
import { SearchLab } from './dto/searchlab.dto';
import { LabChangesDto } from './dto/labStatus-dto';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { User } from 'src/users/models/user.entity';
import { Lab } from './models/lab.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';
import { Allow } from 'src/auth/decorators/alow.decorator';
import { SearchClientDto } from 'src/client/dtos/search-client-dto';
import { ExamDto } from 'src/exams/dto/exam.dto';
import { Role } from 'src/auth/enums/role.enum';
import { ClientDto } from 'src/client/dtos/cliente-dto';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('labs')
export class LabsController {
  constructor(private labsService: LabsService) {}

  @Post()
  @Roles('manager')
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
  @Allow('lab')
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User, @Param('id') id: string): Promise<Lab> {
    return this.labsService.findOne(id, user);
  }

  @Get('/:id/exams')
  @Allow(Role.LAB)
  @UseInterceptors(ClassSerializerInterceptor)
  getExams(
    @GetUser() user: User,
    @Param('id') id: string,
    @Query() search: SearchClientDto,
  ): Promise<ExamDto[]> {
    return this.labsService.findAll(search, user, id);
  }

  @Get('/:id/clients')
  @Roles(Role.LAB)
  @UseInterceptors(ClassSerializerInterceptor)
  getClients(
    @Param('id') id: string,
    @Query() search: SearchClientDto,
    @GetUser() user: User,
  ): Promise<ClientDto[]> {
    return this.labsService.getClientsWithRelatedExam(id, search, user);
  }

  @Patch('/:id')
  @Allow('manager')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(@Param('id') id: string, @Body() body: LabChangesDto) {
    return this.labsService.change(id, body);
  }
}
