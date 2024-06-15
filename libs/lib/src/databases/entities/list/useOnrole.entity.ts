import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'user-role' })
export class UserOnRoleEntity extends BaseEntity {
  @Column({
    type: 'int',
    nullable: false,
  })
  user_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  role_id: number;
}
