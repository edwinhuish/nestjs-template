import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

export interface IUserMetadata {
  avatar?: string;
  age?: number;
  last_login: Date;
  tutorial_completed: boolean;
}

export interface IAddress {
  postcode?: string;
  area?: string;
  state?: string;
  country?: string;
  googleAddress?: string; // google auto complete address
}

@Index('user_email', ['email'], { unique: true })
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  email_verified: boolean;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  email_verification_token?: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  first_name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  last_name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  nick_name: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  postcode?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  mobile?: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  title?: string;

  @Column({
    type: 'simple-array',
    nullable: false,
    default: '[2]',
    comment: 'user roles',
  })
  role: Array<number>;

  // 3rd party platform user fields
  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  stripe_customer_id?: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: true,
  })
  stripe_session_id?: string;

  @Column({
    type: 'json',
  })
  metadata: IUserMetadata;

  @Column({
    type: 'json',
  })
  address: IAddress;

  @Column({
    type: 'simple-array',
    nullable: false,
    comment: 'user preferences',
    default: '[]',
  })
  preferences: Array<number>;

  @Column({
    type: 'simple-array',
    nullable: false,
    comment: 'user taglist',
    default: '[]',
  })
  tags: Array<number>;
}
