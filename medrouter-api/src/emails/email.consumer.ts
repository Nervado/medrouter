import { Processor, Process, OnQueueActive } from '@nestjs/bull';
import { MailerService } from '@nestjs-modules/mailer';
import { Job } from 'bull';

import { configService } from '../config/config.service';

import { jobStatus } from './enums/job-status';
import { Logger } from '@nestjs/common';
import { EmailsGroups } from './enums/emails-groups';
import { EmailTopic } from './enums/email-topic';

import { EmailConfigDto } from './dto/email.config.dto';

@Processor('email')
export class EmailConsumer {
  private readonly logger = new Logger(EmailConsumer.name);

  constructor(private readonly mailerService: MailerService) {}

  @Process(EmailsGroups.ADMINS)
  handleTranscodeNonClients(job: Job) {
    const { data } = job;

    const config = new EmailConfigDto();

    config.from = '<no-reply> system@cv.reformas.com.br';

    config.to = `${configService.getEmailReceivers().coo},${
      configService.getEmailReceivers().cfo
    },${configService.getEmailReceivers().ceo},${
      configService.getEmailReceivers().general
    }`; // list of receivers
    config.subject = 'Cliente C&V Reformas e Construções'; // Subject line
    config.template = data.data.type; // The `.pug` or `.hbs` extension is appended automatically.
    config.replyTo = configService.getEmailReceivers().coo;

    this.sendEmail(job, config);
  }

  @Process(EmailsGroups.CLIENTS)
  handleTranscodeClienst(job: Job) {
    const { data } = job;

    const config = new EmailConfigDto();

    config.from = '<no-reply> system@cv.reformas.com.br';
    config.to = data.data.email; // list of receivers
    config.subject = 'Cliente C&V Reformas e Construções'; // Subject line
    config.template = data.data.type; // The `.pug` or `.hbs` extension is appended automatically.
    config.replyTo = configService.getEmailReceivers().coo;
    this.sendEmail(job, config);
  }

  @Process(EmailsGroups.PROFESSIONALS)
  handleTranscodeAdmins(job: Job) {
    const { data } = job;

    const config = new EmailConfigDto();

    config.from = '<no-reply> system@cv.reformas.com.br';
    config.to = data.email; // list of receivers
    config.subject = 'Profissional C&V Reformas e Construções'; // Subject line
    config.template = data.type; // The `.pug` or `.hbs` extension is appended automatically.
    config.replyTo = configService.getEmailReceivers().coo;

    this.sendEmail(job, config);
  }

  @Process(EmailsGroups.NONCLIENTS)
  handleTranscodeProfessionals(job: Job) {
    const { data } = job;

    const config = new EmailConfigDto();

    switch (data.type) {
      case EmailTopic.BUDGETS:
        config.from = '<no-reply> system@cv.reformas.com.br';
        config.to = configService.getEmailReceivers().coo; // list of receivers
        config.subject = 'Sobre orçamentos'; // Subject line
        config.template = data.type; // The `.pug` or `.hbs` extension is appended automatically.
        config.replyTo = data.email;
        break;

      case EmailTopic.COMPLAINT:
        config.from = '<no-reply> system@cv.reformas.com.br';
        config.to = configService.getEmailReceivers().general; // list of receivers
        config.subject = 'Reclamações'; // Subject line
        config.template = data.type; // The `.pug` or `.hbs` extension is appended automatically.
        config.replyTo = data.email;
        break;

      case EmailTopic.FINANCIAL:
        config.from = '<no-reply> system@cv.reformas.com.br';
        config.to = configService.getEmailReceivers().cfo; // list of receivers
        config.subject = 'Financeiro'; // Subject line
        config.template = data.type; // The `.pug` or `.hbs` extension is appended automatically.
        config.replyTo = data.email;
        break;

      case EmailTopic.GENERAL:
        config.from = '<no-reply> system@cv.reformas.com.br';
        config.to = configService.getEmailReceivers().general; // list of receivers
        config.subject = 'Outros assuntos'; // Subject line
        config.template = data.type; // The `.pug` or `.hbs` extension is appended automatically.
        config.replyTo = data.email;
        break;

      default:
        break;
    }

    this.sendEmail(job, config);
  }

  @OnQueueActive()
  onActive(job: Job) {
    console.log(
      `Processing job ${job.id} of type ${job.name} with data ${{
        ...job.data,
      }}...${job.finished ? jobStatus.DONE : jobStatus.UNDONE}`,
    );
  }

  public sendEmail(job: Job, config: EmailConfigDto): void {
    this.mailerService
      .sendMail({
        to: config.to,
        from: config.from,
        subject: config.subject,
        replyTo: config.replyTo,
        template: config.template,
        context: job.data,
      })
      .then(resp => {
        this.logger.verbose(resp);
      })
      .catch(error => {
        this.logger.error(error);
      });
  }
}
