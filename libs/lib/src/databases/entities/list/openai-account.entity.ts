import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

@Index('openai_account_api_name', ['api_name'], { unique: true })
@Entity({ name: 'openai_accounts' })
export class OpenAIAccountsEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 200, nullable: false })
  api_name: string;

  @Column({ type: 'varchar', length: 200, nullable: false })
  api_key: string;
}
