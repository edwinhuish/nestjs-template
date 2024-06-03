import {
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    comment: 'PrimaryKey',
  })
  id: number;

  @CreateDateColumn({
    comment: 'timeStamp',
  })
  created_at?: Date | null;

  @UpdateDateColumn({
    comment: 'timeStamp',
  })
  updated_at?: Date | null;

  @DeleteDateColumn({
    comment: 'timeStamp',
  })
  deleted_at?: Date | null;
}
