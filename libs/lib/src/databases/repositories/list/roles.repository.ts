import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RoleEntity } from '../../entities';

@Injectable()
export class RolesRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  async findByIDs(ids: Array<number>) {
    const where: FindOptionsWhere<RoleEntity> = {};

    if (ids.length > 1) {
      where.id = In(ids);
    } else {
      where.id = ids[0];
    }

    return await this.find({
      where: { ...where },
    });
  }

  async checkIfRolesExists(role_ids: Array<number>) {
    const roles = await this.findByIDs(role_ids);

    if (roles.length !== role_ids.length) {
      return false;
    } else {
      return true;
    }
  }

  async findByIdOrThrow(role_id: number) {
    const role = await this.findOne({
      where: { id: role_id },
    });

    if (!role) {
      throw new BadRequestException('Role not found --- RolesRepository');
    } else {
      return role;
    }
  }
}
