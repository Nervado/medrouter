import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { MailerModule, PugAdapter } from '@nestjs-modules/mailer';

import { configService } from '../config/config.service';
import { EmailsService } from './emails.service';
import { EmailConsumer } from './email.consumer';
import { EmailsController } from './emails.controller';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
      redis: configService.getRedisConfig(),
    }),
    MailerModule.forRoot({
      transport: {
        host: configService.getEmailConfig().transport.host,
        port: configService.getEmailConfig().transport.port,
        auth: {
          user: configService.getEmailConfig().transport.auth.user,
          pass: configService.getEmailConfig().transport.auth.pass,
        },
      },
      defaults: {
        from: configService.getEmailConfig().defaults.from,
      },
      template: {
        dir: __dirname + '/views',
        adapter: new PugAdapter(),
        options: {
          strict: true,
        },
      },
      /*
      options: {
        partials: {
          dir: path.resolve(__dirname, '..', 'emails', 'views', 'partials'),
          options: {
            strict: true,
          },
        },
      },
     */
    }),
  ],

  providers: [EmailsService, EmailConsumer],
  exports: [EmailsService, EmailConsumer],
  controllers: [EmailsController],
})
export class EmailsModule {}
