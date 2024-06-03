import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RolePermissionEntity } from '../../entities';

@Injectable()
export class PermissionOnRoleRepository extends Repository<RolePermissionEntity> {
  constructor(private dataSource: DataSource) {
    super(RolePermissionEntity, dataSource.createEntityManager());
  }

  async findByRoleId(id: number) {
    return await this.find({
      where: { id },
    });
  }

  async findByRoleIdOrThrow(id: number) {
    const role = await this.findOne({
      where: { id },
    });

    if (!role) {
      throw new BadRequestException('Role not found');
    }

    return role;
  }
}
