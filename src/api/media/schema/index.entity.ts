import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum Status {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}
@Entity()
export class Media {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @BeforeInsert()
  generateId() {
    this.id = uuid();
  }

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  url: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true, default: new Date(0) })
  deletedAt: Date;
  @Column({
    type: 'enum',
    enum: ['false', 'true'],
    default: 'false',
  })
  is_deleted: 'false' | 'true';
}
