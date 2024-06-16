import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersEntity } from '../../entities';

@Injectable()
export class UsersRepository extends Repository<UsersEntity> {
  constructor(private dataSource: DataSource) {
    super(UsersEntity, dataSource.createEntityManager());
  }

  async findByID(user_id: number) {
    return this.findOne({
      where: { id: user_id },
    });
  }

  async findByIdAndVerify(user_id: number) {
    const user = await this.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }
    if (user.is_suspended) {
      throw new BadRequestException('User is suspended');
    }
    return user;
  }

  async findByEmail(email: string) {
    return this.findOne({
      where: { email },
    });
  }

  async findByEmailOrThrow(email: string) {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    } else {
      return user;
    }
  }

  async findByEmailAndVerify(email: string) {
    const user = await this.findOne({
      where: { email, email_verified: true },
    });

    if (!user) {
      throw new BadRequestException('User not found, or email not verified');
    } else {
      return user;
    }
  }
}
