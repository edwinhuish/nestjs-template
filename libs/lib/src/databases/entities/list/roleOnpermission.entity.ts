import { Column, Entity, Index } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'role-permission' })
@Index(['role_id', 'permission_id'], { unique: true })
export class RoleOnPermissionEntity extends BaseEntity {
  @Column({
    type: 'int',
    nullable: false,
  })
  role_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  permission_id: number;
}
