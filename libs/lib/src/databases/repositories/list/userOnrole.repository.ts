import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserOnRoleEntity } from '../../entities/list/useOnrole.entity';

@Injectable()
export class UserOnRoleRepository extends Repository<UserOnRoleEntity> {
  constructor(private dataSource: DataSource) {
    super(UserOnRoleEntity, dataSource.createEntityManager());
  }

  async findByUserId(id: number) {
    return await this.find({
      where: {
        user_id: id,
      },
    });
  }

  async findByRoleId(id: number) {
    return await this.find({
      where: {
        role_id: id,
      },
    });
  }

  async createMany(payload: { user_id: number; role_ids: Array<number> }) {
    return await this.insert(
      payload.role_ids.map((role_id) => ({
        role_id,
        user_id: payload.user_id,
      })),
    );
  }

  async revokeMany(payload: { role_on_users_id: Array<number> }) {
    return await this.delete(payload.role_on_users_id);
  }
}
