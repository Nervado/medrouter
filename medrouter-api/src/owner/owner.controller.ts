import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Post,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerDto } from './dtos/owner-dto';
import { Owner } from './models/owner.entity';

@Controller('owners')
export class OwnerController {
  constructor(private readonly os: OwnerService) {}
  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body(ValidationPipe) body: OwnerDto): Promise<Owner> {
    return this.os.create(body);
  }
}
