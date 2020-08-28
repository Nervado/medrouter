import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { ExamsService } from 'src/exams/exams.service';

@Injectable()
export class SchedulesService {
  constructor(private as: AppointmentsService, private es: ExamsService) {}

  private readonly logger = new Logger(SchedulesService.name);

  @Cron('1 0 0 * * *') // one task
  async handleActiveSchedules() {
    this.logger.verbose('Completing active schedules...');

    this.logger.verbose(
      `Active schedules updated: ${(await this.as.completeSchedules()) || 0}`,
    );
  }

  @Cron('1 0 1 * * *') // one task
  async handleActiveExams() {
    this.logger.verbose('Decrementing active exams deadline...');

    this.logger.verbose(
      `Active exams updated: ${(await this.es.reduceDeadlineExams()) || 0}`,
    );
  }
}
