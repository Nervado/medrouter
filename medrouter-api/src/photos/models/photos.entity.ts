import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { configService } from 'src/config/config.service';
import { Exclude, Expose } from 'class-transformer';
// import { Budget } from 'src/budgets/models/budget.entity';

@Entity({ name: 'PhotosTable' })
export class Photo extends BaseEntity {
  @PrimaryGeneratedColumn()
  photoid: number;

  @Column()
  filename: string;

  @Exclude()
  @Column()
  path: string;

  /**
   *   @OneToMany(
    () => Budget,
    budget => budget.photo,
  )
  @JoinColumn()
  budget: Budget;
   * 
   */

  @Expose()
  get url() {
    return `${configService.getServerUrl()}/photos/${this.filename}`;
  }
}
