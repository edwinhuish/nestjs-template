import { DataSource, In, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RoleEntity } from '../../entities';

@Injectable()
export class RolesRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }

  async findByIDS(ids: Array<number>) {
    return await this.find({
      where: { id: In(ids) },
    });
  }
}
