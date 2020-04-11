import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
  Put,
  Body,
  UseGuards,
  Query,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Manager } from './models/manager.entity';
import { ManagerService } from './manager.service';
import { ManagerDto } from './dto/manager.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PageFilterDto } from 'src/users/dto/page-filter.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('manager')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Post()
  @Roles('client')
  @UseInterceptors(ClassSerializerInterceptor)
  createManager(@Body() body: ManagerDto): Promise<Manager> {
    return this.managerService.createOne(body);
  }

  @Get()
  @Roles('client')
  @UseInterceptors(ClassSerializerInterceptor)
  getAllManager(
    @Query(ValidationPipe) page: PageFilterDto,
  ): Promise<Manager[]> {
    return this.managerService.getMany(page.page);
  }

  @Get('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  @Roles('client')
  getManager(@Param('id') id: number): Promise<Manager> {
    return this.managerService.getOne(id);
  }

  @Delete('/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  dismissManager(@Param('id') id: number): void {
    this.managerService.deleteOne(id);
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatusManager(
    @Param('id') id: number,
    @Body('status', ValidationPipe) body: ManagerDto,
  ): Promise<Manager> {
    return this.managerService.modifyOne(id, body, 'status');
  }

  @Patch('/:id/diff')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeSalaryManager(
    @Param('id') id: number,
    @Body('diff', ValidationPipe) body: ManagerDto,
  ): Promise<Manager> {
    return this.managerService.modifyOne(id, body, 'diff');
  }
}
