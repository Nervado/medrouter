import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  AfterLoad,
  BeforeInsert,
} from 'typeorm';
import { configService } from 'src/config/config.service';
import { Exclude } from 'class-transformer';

@Entity({ name: 'AvatarTable' })
export class Avatar extends BaseEntity {
  @PrimaryGeneratedColumn()
  avatarId: number;

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
}
