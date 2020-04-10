import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { configService } from 'src/config/config.service';
import { Exclude, Expose } from 'class-transformer';
import { User } from 'src/users/models/user.entity';

@Entity({ name: 'DocsTable' })
export class Doc extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Exclude()
  @Column()
  path: string;

  @ManyToOne(
    () => User,
    user => user.doc,
  )
  @JoinColumn()
  user: User;

  @Expose()
  get url() {
    return `${configService.getServerUrl()}/docs/${this.filename}`;
  }
}
