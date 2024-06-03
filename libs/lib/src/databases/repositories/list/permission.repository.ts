import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { PermissionEntity } from '../../entities';

@Injectable()
export class PermissionsRepository extends Repository<PermissionEntity> {
  constructor(private dataSource: DataSource) {
    super(PermissionEntity, dataSource.createEntityManager());
  }

  async findByID(id: number) {
    return this.findOne({
      where: { id },
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
}
