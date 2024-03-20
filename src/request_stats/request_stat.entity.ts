import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class RequestStat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  ip: string;

  @Column()
  userAgent: string;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted Request with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Request with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Request with id ${this.id}`);
  }
}
