import { DataSource, Repository } from 'typeorm';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OpenAIAccountsEntity } from '../../entities';

@Injectable()
export class OpenAIAccountsRepository extends Repository<OpenAIAccountsEntity> {
  constructor(private dataSource: DataSource) {
    super(OpenAIAccountsEntity, dataSource.createEntityManager());
  }

  async findByName(api_name: string) {
    return this.find({
      where: { api_name: api_name },
    });
  }

  async findByNameOrThrow(api_name: string) {
    const openAIAccount = await this.findOne({
      where: {
        api_name: api_name,
      },
    });

    if (!openAIAccount) {
      throw new BadRequestException('API and API key for openAI not found');
    } else {
      return openAIAccount;
    }
  }
}
