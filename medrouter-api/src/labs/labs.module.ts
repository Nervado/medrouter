import { Module, forwardRef } from '@nestjs/common';
import { LabsController } from './labs.controller';
import { LabsService } from './labs.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LabsRepository } from './labs.repository';
import { UsersModule } from 'src/users/users.module';
import { ExamsModule } from 'src/exams/exams.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LabsRepository]),
    UsersModule,
    forwardRef(() => ExamsModule),
  ],
  controllers: [LabsController],
  providers: [LabsService],
  exports: [LabsService],
})
export class LabsModule {}
