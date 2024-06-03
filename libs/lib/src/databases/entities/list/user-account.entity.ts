import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'user_social_account' })
export class UserAccountEntity extends BaseEntity {
  // core fields
  @Column({
    type: 'enum',
    enum: ['google', 'facebook'],
    default: 'google',
  })
  provider: 'google' | 'facebook';

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  provider_id: string;

  @Column({
    type: 'varchar',
    length: 200,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  firstName?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  lastName?: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  avatar?: string;

  // relations, loose cuppled, avoid strong relations
  @Column({
    type: 'int',
    nullable: false,
  })
  user_id: number;
}
