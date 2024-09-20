import { Injectable, Logger } from '@nestjs/common';
import { UsersRepository } from '../repositories';
import { IAddress, IUserMetadata } from '../entities';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(private readonly userRepo: UsersRepository) {}

  async createUser(payload: {
    email: string;
    first_name: string;
    last_name: string;
    password: string;
  }) {
    return await this.userRepo.save(this.userRepo.create(payload));
  }

  async suspendUser(id: number) {
    return await this.userRepo.update(id, {
      is_suspended: true,
      deleted_at: new Date(),
    });
  }

  async unsuspendUser(id: number) {
    return await this.userRepo.update(id, {
      is_suspended: false,
      deleted_at: null,
    });
  }

  async updateUser(
    id: number,
    payload: {
      email?: string;
      email_verified?: boolean;
      email_verification_token?: string;

      first_name?: string;
      last_name?: string;
      nick_name?: string;

      password?: string;

      postcode?: string;
      mobile?: string;
      title?: string;

      stripe_customer_id?: string;
      stripe_session_id?: string;

      metadata?: IUserMetadata;
      address?: IAddress;

      preferences?: Array<number>;
      tages?: Array<number>;
    },
  ) {
    return await this.userRepo.update(id, payload);
  }

  async getUserByEmail(email: string) {
    return await this.userRepo.findByEmailOrThrow(email);
  }

  async getUserById(id: number) {
    return await this.userRepo.findByID(id);
  }

  async getUserAndVerify(id: number) {
    return await this.userRepo.findByIdAndVerify(id);
  }
}
