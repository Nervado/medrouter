import { Injectable, Logger, Inject, forwardRef } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppointmentsService } from 'src/appointments/appointments.service';

@Injectable()
export class SchedulesService {
  constructor(private as: AppointmentsService) {}

  private readonly logger = new Logger(SchedulesService.name);

  @Cron('45 * * * * *') // one task
  async handleActiveSchedules() {
    this.logger.verbose('Completing active schedules...');

    this.logger.verbose(
      `Active schedules updated: ${(await this.as.completeSchedules()) || 0}`,
    );
  }
}
