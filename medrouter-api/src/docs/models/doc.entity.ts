import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { configService } from 'src/config/config.service';
import { Exclude, Expose } from 'class-transformer';

@Entity('documents')
export class Doc extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Exclude()
  @Column()
  path: string;

  @Expose()
  get url() {
    return `${configService.getServerUrl()}/docs/${this.filename}`;
  }
}
