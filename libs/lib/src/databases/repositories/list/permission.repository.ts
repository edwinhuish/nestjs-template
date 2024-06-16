import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PermissionEntity } from '../../entities';

@Injectable()
export class PermissionsRepository extends Repository<PermissionEntity> {
  constructor(private dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }

  async findByIDs(ids: number[]) {
    const where: FindOptionsWhere<PermissionEntity> = {};

    if (ids.length > 1) {
      where.id = In(ids);
    } else {
      where.id = ids[0];
    }

    return this.find({
      where: {
        ...where,
        is_active: true,
      },
    });
  }

  async findByIdOrThrough(id: number) {
    const permission = await this.findOne({
      where: {
        id,
      },
    });

    if (!permission) {
      throw new BadRequestException('permission not found');
    } else {
      return permission;
    }
  }

  async findByName(names: string[]) {
    const where: FindOptionsWhere<PermissionEntity> = {};
    if (names.length > 1) {
      where.name = In(names);
    } else {
      where.name = names[0];
    }

    return this.find({
      where: {
        ...where,
      },
    });
  }

  async collectAllPermissionMetas(ids: number[]) {
    const permissions = await this.findByIDs(ids);
    const permission_metas = {
      permissions: [],
      api: [],
      page: [],
      action: [],
    };

    permissions.map((permission) => {
      permission_metas.permissions.push(permission.name);
      permission_metas.api.push(permission.meta.api);
      permission_metas.page.push(permission.meta.page);
      permission_metas.action.push(permission.meta.action);
    });

    return permission_metas;
  }
}
