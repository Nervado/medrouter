import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Available } from '../enums/available.enum';
@Entity()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: string;

  @Column({
    type: 'enum',
    enum: Available,
    default: [
      Available.H09,
      Available.H10,
      Available.H11,
      Available.H14,
      Available.H15,
      Available.H16,
    ],
    array: true,
  })
  availablehours: Available[];
}
