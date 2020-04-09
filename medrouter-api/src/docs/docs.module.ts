import { Module } from '@nestjs/common';
import { DocsController } from './docs.controller';
import { DocsService } from './docs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocRepository } from './doc.repository';
import { DocGuard } from './guards/doc.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([DocRepository])],
  controllers: [DocsController],
  providers: [
    DocsService,
    {
      provide: APP_GUARD,
      useClass: DocGuard,
    },
  ],
})
export class DocsModule {}
