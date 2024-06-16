import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class OpenAIAccountsService {
  private readonly logger = new Logger(OpenAIAccountsService.name);
  constructor() {}
}
