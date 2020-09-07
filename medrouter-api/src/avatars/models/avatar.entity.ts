import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  BeforeInsert,
  DeleteDateColumn,
} from 'typeorm';
import { configService } from 'src/config/config.service';
import { Exclude } from 'class-transformer';

@Entity('avatar')
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  avatarId: string;

  @Column()
  filename: string;

  @Exclude()
  @Column()
  path: string;

  url: string;

  @BeforeInsert()
  @AfterLoad()
  setComputed() {
    this.url = `${configService.getServerUrl()}/avatars/${this.filename}`;
  }

  @Exclude()
  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date;
}
