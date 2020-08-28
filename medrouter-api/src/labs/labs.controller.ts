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

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
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
  @Allow('lab')
  @UseInterceptors(ClassSerializerInterceptor)
  get(@GetUser() user: User, @Param('id') id: any): Promise<Lab> {
    return this.labsService.findOne(id, user);
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
