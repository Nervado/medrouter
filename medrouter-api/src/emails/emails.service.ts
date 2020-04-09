import { Injectable, Logger } from '@nestjs/common';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { EmailJob } from './jobs/send-email.job';
import { EmailTypes } from './enums/email-types';
import { EmailsGroups } from './enums/emails-groups';

@Injectable()
export class EmailsService {
  private readonly logger = new Logger();
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  sendEmail(data: any, type: EmailTypes, group: EmailsGroups): boolean {
    const emailJob = new EmailJob(
      `${group}`,
      {
        data: { ...data, admin: 'Camila', phoneNumber: '21972857728', type },
        date: new Date(),
      },
      { delay: 200 },
    );

    const queed = this.emailQueue.add(
      emailJob.name,
      emailJob.data,
      emailJob.opts,
    );

    this.logger.verbose('Add to queue...');
    this.logger.verbose(emailJob.data);

    return queed ? true : false;
  }
}
