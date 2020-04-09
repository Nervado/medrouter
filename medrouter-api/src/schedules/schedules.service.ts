import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SchedulesService {
  private readonly logger = new Logger(SchedulesService.name);

  // @Cron('45 * * * * *') // one task
  // handleCron() {
  //   this.logger.verbose('Called when the current second is 45');
  // }
}
