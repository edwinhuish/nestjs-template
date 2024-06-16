import { get } from 'lodash';

import { type DynamicModule } from '@nestjs/common';
import { TypeOrmModule, type TypeOrmModuleOptions } from '@nestjs/typeorm';

import * as Entities from './entities';
import * as Repositories from './repositories';
import { BUSINESS_SERVICES } from './repo-services';

const BUSINESS_ENTITIES: any[] = Object.keys(Entities)
  .map((key) => {
    if (key.includes('Entity') && key != 'BaseEntity') {
      return get(Entities, key);
    }
    return null;
  })
  .filter(Boolean);

const ENTITIES: any[] = Object.values(Repositories);

export class DatabaseModule {
  static forRoot(databaseConfig: TypeOrmModuleOptions): DynamicModule {
    return {
      global: true,
      module: DatabaseModule,
      imports: [
        TypeOrmModule.forRoot({
          ...databaseConfig,
          entities: [...BUSINESS_ENTITIES],
        }),
        TypeOrmModule.forFeature([...BUSINESS_ENTITIES]),
      ],
      providers: [...ENTITIES, ...BUSINESS_SERVICES], // along with services setting
      exports: [...ENTITIES, ...BUSINESS_SERVICES], // along with services setting
    };
  }
  onModuleInit() {
    console.log('The database has been initialized.');
  }
}
