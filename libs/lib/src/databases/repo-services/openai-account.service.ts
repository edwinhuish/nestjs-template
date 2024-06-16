import { Injectable, Logger } from '@nestjs/common';
import { OpenAIAccountsRepository } from '../repositories';

@Injectable()
export class OpenAIAccountService {
  private readonly logger = new Logger(OpenAIAccountService.name);
  constructor(private readonly openaiAccountRepo: OpenAIAccountsRepository) {}

  async addOpenAIAccount(api_name: string, api_key: string) {
    return await this.openaiAccountRepo.save({
      api_name: api_name,
      api_key: api_key,
    });
  }

  async getOpenAIAccount(api_name: string) {
    return await this.openaiAccountRepo.findByNameOrThrow(api_name);
  }

  async getOpenAIAccounts() {
    return await this.openaiAccountRepo.find();
  }

  async updateOpenAIAccount(api_name: string, api_key: string) {
    return await this.openaiAccountRepo.save({
      api_name: api_name,
      api_key: api_key,
    });
  }

  async deleteOpenAIAccount(api_name: string) {
    return await this.openaiAccountRepo.delete({ api_name: api_name });
  }
}
