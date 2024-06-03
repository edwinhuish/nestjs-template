import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'role' })
export class RoleEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
    default: 'member',
    unique: true,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  desc?: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  notes: string;

  @Column({
    type: 'timestamp',
    nullable: true,
    default: null,
    comment: 'null means never expired',
  })
  expires_at?: Date | null;
}
