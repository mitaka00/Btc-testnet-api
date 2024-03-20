import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class BlockTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  blockHeight: number;

  @Column()
  transactionHash: string;

  @Column()
  sender: string;

  @Column()
  receiver: string;

  @Column('numeric')
  amountSent: number;

  @AfterInsert()
  logInsert() {
    console.log(`Inserted Transaction with id ${this.id}`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`Updated Transaction with id ${this.id}`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`Removed Transaction with id ${this.id}`);
  }
}
