import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  ValidationPipe,
  Get,
  Query,
  Patch,
  Param,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerDto } from './dtos/owner-dto';
import { Owner } from './models/owner.entity';
import { SearchFilterDto } from 'src/users/dto/search-filter.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('owners')
export class OwnerController {
  constructor(private readonly os: OwnerService) {}
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body(ValidationPipe) body: OwnerDto): Promise<Owner> {
    return this.os.create(body);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  getAll(@Query(ValidationPipe) search: SearchFilterDto): Promise<Owner[]> {
    return this.os.getAll(search);
  }

  @Patch('/:id/status')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeStatus(
    @Param('id') id: number,
    @Body('status', ValidationPipe) body: OwnerDto,
  ): Promise<Owner> {
    return this.os.modifyOne(id, body, 'status');
  }

  @Patch('/:id/diff')
  @Roles('owner')
  @UseInterceptors(ClassSerializerInterceptor)
  changeSalary(
    @Param('id') id: number,
    @Body('diff', ValidationPipe) body: OwnerDto,
  ): Promise<Owner> {
    return this.os.modifyOne(id, body, 'diff');
  }
}
