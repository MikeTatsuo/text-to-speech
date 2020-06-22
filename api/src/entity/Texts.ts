import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Texts {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;
}
