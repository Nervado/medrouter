import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MedicineDto } from './dto/medicine.dto';
import { MedicinesService } from './medicines.service';
import { User } from 'src/users/models/user.entity';
import { GetUser } from 'src/users/decorators/get-user.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles-auth.guard';
import { AlowGuard } from 'src/auth/guards/allow-auth.guard';

@UseGuards(JwtAuthGuard, RolesGuard, AlowGuard)
@Controller('medicines')
export class MedicinesController {
  constructor(private ms: MedicinesService) {}

  @Post()
  @Roles('doctor')
  create(@Body() medicine: MedicineDto, @GetUser() user: User) {
    return this.ms.create(medicine, user);
  }
}
