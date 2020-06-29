import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './models/client.entity';
import { UsersModule } from 'src/users/users.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { DocsModule } from 'src/docs/docs.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    UsersModule,
    DocsModule,
    AppointmentsModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
})
export class ClientModule {}
