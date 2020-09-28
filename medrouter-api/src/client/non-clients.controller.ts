import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ClientService } from './client.service';
import { AvailableHoursDto } from './dtos/availablehours-dto';
import { NonClientAppointmentRequest } from './dtos/non-client-dto';
import { AvailableSearchDto } from './dtos/availablesearch-dto';

@Controller('non-clients')
export class NonClientsController {
  constructor(private clientService: ClientService) {}

  @Get()
  getSpecialtys(): Promise<string[]> {
    return this.clientService.searchAvailableSpecialtys();
  }

  @Get('schedules')
  getAvailableSchedules(
    @Query() search: AvailableSearchDto,
  ): Promise<AvailableHoursDto[]> {
    return this.clientService.searchAvailableSchedules(search);
  }

  @Post()
  requestAppointment(
    @Body() nonClientRequest: NonClientAppointmentRequest,
  ): Promise<void> {
    return this.clientService.createAppointmentAndNewClient(nonClientRequest);
  }
}
