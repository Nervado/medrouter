import { Module, forwardRef } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './models/client.entity';
import { UsersModule } from 'src/users/users.module';
import { DocsModule } from 'src/docs/docs.module';
import { PhotosModule } from 'src/photos/photos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Client]),
    forwardRef(() => UsersModule),
    DocsModule,
    PhotosModule,
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports: [ClientService],
})
export class ClientModule {}
