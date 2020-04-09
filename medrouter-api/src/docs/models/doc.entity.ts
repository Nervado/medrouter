import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { configService } from 'src/config/config.service';
import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/users/models/user.entity';

@Entity({ name: 'DocsTable' })
export class Doc extends BaseEntity {
  @PrimaryGeneratedColumn()
  docId: number;

  @Column()
  filename: string;

  @Exclude()
  @Column()
  path: string;

  @Expose()
  get url() {
    return `${configService.getServerUrl()}/docs/${this.filename}`;
  }

  @OneToOne(() => Doc)
  @JoinColumn()
  user: User;
}
