import { Injectable, Logger } from '@nestjs/common';
import { Cron, Timeout } from '@nestjs/schedule';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { ExamsService } from 'src/exams/exams.service';

import { OwnerService } from 'src/owner/owner.service';
import { ConfigService } from 'src/config/config.service';
import { UsersService } from 'src/users/users.service';
import { generatePass } from 'src/utils/hash-pass';

@Injectable()
export class SchedulesService {
  constructor(
    private as: AppointmentsService,
    private es: ExamsService,
    // private clientsService: ClientService,
    private ownersService: OwnerService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) {}

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

  @Timeout(5000)
  async handleTimeout() {
    this.logger.warn(
      'Cheking if admin user has been seted detected... please stand-by',
    );
    const owner = await this.ownersService.getMany(1);

    if (owner.length === 0) {
      this.logger.verbose(
        'No admin user detected... generating... please stand-by',
      );
      try {
        const password = generatePass();
        const user = await this.usersService.signUp({
          username: 'admin',
          email: this.configService.getEmailReceivers().sys,
          password: password,
          passwordConfirmation: password,
        });

        const owner = await this.ownersService.create({
          salary: 1000,
          user: {
            username: user.username,
            email: user.email,
          },
        });

        if (owner && user) {
          this.logger.warn(`Create ADMIN user id: ${owner.user.userId}`);
        }
      } catch (error) {
        this.logger.error(error);
      }
    } else {
      this.logger.verbose(`Detected ${owner.length} owners in database.`);
    }
  }
}
