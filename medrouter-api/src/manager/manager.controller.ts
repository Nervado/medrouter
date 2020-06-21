import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  Patch,
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
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('managers')
export class ManagerController {
  constructor(private managerService: ManagerService) {}

  @Post()
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  createManager(@Body() body: ManagerDto): Promise<Manager> {
    return this.managerService.createOne(body);
  }

  @Get()
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  getAllManager(
    @Query(ValidationPipe) search: SearchFilterDto,
  ): Promise<Manager[]> {
    return this.managerService.getAll(search);
  }

  @Get('/:id')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  getManager(@Param('id') id: string): Promise<Manager> {
    return this.managerService.getOne(id);
  }

  @Delete('/:id')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  dismissManager(@Param('id') id: string): void {
    this.managerService.delete(id);
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatusManager(
    @Param('id') id: string,
    @Body('status', ValidationPipe) body: ManagerDto,
  ): Promise<Manager> {
    return this.managerService.modifyOne(id, body, 'status');
  }

  @Patch('/:id/diff')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeSalaryManager(
    @Param('id') id: string,
    @Body('diff', ValidationPipe) body: ManagerDto,
  ): Promise<Manager> {
    return this.managerService.modifyOne(id, body, 'diff');
  }
}
