import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserAccountEntity } from '../../entities';

@Injectable()
export class UserAccountsRepository extends Repository<UserAccountEntity> {
  constructor(private dataSource: DataSource) {
    super(UserAccountEntity, dataSource.createEntityManager());
  }

  async findByID(user_id: number) {
    return this.find({
      where: { id: user_id },
    });
  }

  async findByIdOrThrow(user_id: number) {
    const user_account = await this.find({
      where: {
        id: user_id,
      },
    });

    if (user_account.length === 0) {
      return false;
    } else {
      return user_account;
    }
  }
}
