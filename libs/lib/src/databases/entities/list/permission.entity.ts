import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'permission' })
export class PermissionEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({
    type: 'text',
    length: 500,
    nullable: true,
  })
  decr: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;
}
