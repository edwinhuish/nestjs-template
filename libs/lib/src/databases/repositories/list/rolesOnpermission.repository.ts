import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleOnPermissionEntity } from '../../entities';

@Injectable()
export class PermissionOnRoleRepository extends Repository<RoleOnPermissionEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleOnPermissionEntity, dataSource.createEntityManager());
  }

  async findByRoleIds(ids: number[]) {
    const where: FindOptionsWhere<RoleOnPermissionEntity> = {};

    if (ids.length > 1) {
      where.role_id = In(ids);
    } else {
      where.role_id = ids[0];
    }

    return this.find({
      where: {
        ...where,
      },
    });
  }

  async findByRoleIdOrThrow(id: number) {
    const role = await this.findOne({
      where: { role_id: id },
    });

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    return role;
  }

  async createMany(payload: {
    role_id: number;
    permission_ids: Array<number>;
  }) {
    return await this.insert(
      payload.permission_ids.map((permission_id) => ({
        permission_id,
        role_id: payload.role_id,
      })),
    );
  }
}
