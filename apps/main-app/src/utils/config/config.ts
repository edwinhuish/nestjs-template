import { z } from 'zod';

// This is a custom zod type that allows us to parse a string or number and return a number
const StringifyNumber = z
  .union([z.string(), z.number()])
  .transform((val) => Number(val))
  .pipe(z.number());

const schema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  // ---------------------------------- main website settings
  PORT: StringifyNumber,
  host: z.string(),
  // ---------------------------------- database-1 settings
  DATABASE_MAIN_HOST: z.string(),
  DATABASE_MAIN_PORT: StringifyNumber,
  DATABASE_MAIN_USERNAME: z.string(),
  DATABASE_MAIN_PASSWORD: z.string(),
  DATABASE_MAIN_DATABASE: z.string(),
  // ---------------------------------- database-2 settings
  DATABASE_SEC_HOST: z.string(),
  DATABASE_SEC_PORT: StringifyNumber,
  DATABASE_SEC_USERNAME: z.string(),
  DATABASE_SEC_PASSWORD: z.string(),
  DATABASE_SEC_DATABASE: z.string(),
  // ---------------------------------- redis-1 settings
  REDIS1_HOST: z.string(),
  REDIS1_PORT: StringifyNumber,
  REDIS1_PASSWORD: z.string(),
  REDIS1_DB: z.string(),
  // ---------------------------------- redis-2 settings
  REDIS2_HOST: z.string(),
  REDIS2_PORT: StringifyNumber,
  REDIS2_PASSWORD: z.string(),
  REDIS2_DB: z.string(),
  // ---------------------------------- redis-3 settings
  REDIS3_HOST: z.string(),
  REDIS3_PORT: StringifyNumber,
  REDIS3_PASSWORD: z.string(),
  REDIS3_DB: z.string(),
  // ---------------------------------- redis-4 settings
  REDIS4_HOST: z.string(),
  REDIS4_PORT: z.string(),
  REDIS4_PASSWORD: z.string(),
  REDIS4_DB: z.string(),
  // ---------------------------------- middlewares settings
  RABBITMQ_URI: z.string(),
  MEILISEARCH_URI: z.string(),
  MEILISEARCH_KEY: z.string(),
  // ---------------------------------- google settings
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_MAP_API_KEY: z.string(),
  // ---------------------------------- sendgrid settings
  SENDGRID_API_KEY: z.string(),
  SENDGRID_AUTHENTICATED_SENDER: z.string(),
  // ---------------------------------- crypto settings
  APP_SALT_ROUNDS: z.string(),
  // ---------------------------------- stripe settings
  STRIPE_PK: z.string(),
  STRIPE_SK: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  STRIPE_PRICE_ID_ITEM1: z.string(),
  STRIPE_PRICE_ID_ITEM2: z.string(),
  STRIPE_PRICE_ID_ITEM3: z.string(),
});

const env = schema.parse(process.env);

export default () => ({
  currentEnv: env.NODE_ENV,
  mainApp: {
    host: env.host,
    port: env.PORT,
  },
  databases: {
    main_database: {
      main_host: env.DATABASE_MAIN_HOST,
      main_port: env.DATABASE_MAIN_PORT,
      main_username: env.DATABASE_MAIN_USERNAME,
      main_password: env.DATABASE_MAIN_PASSWORD,
      main_database: env.DATABASE_MAIN_DATABASE,
    },
    sec_database: {
      sec_host: env.DATABASE_SEC_HOST,
      sec_port: env.DATABASE_SEC_PORT,
      sec_username: env.DATABASE_SEC_USERNAME,
      sec_password: env.DATABASE_SEC_PASSWORD,
      sec_database: env.DATABASE_SEC_DATABASE,
    },
  },
  redis: {
    db0: {
      host: env.REDIS1_HOST,
      port: env.REDIS1_PORT,
      password: env.REDIS1_PASSWORD,
      db: env.REDIS1_DB,
    },
    db1: {
      host: env.REDIS2_HOST,
      port: env.REDIS2_PORT,
      password: env.REDIS2_PASSWORD,
      db: env.REDIS2_DB,
    },
    db2: {
      host: env.REDIS3_HOST,
      port: env.REDIS3_PORT,
      password: env.REDIS3_PASSWORD,
      db: env.REDIS3_DB,
    },
    db3: {
      host: env.REDIS3_HOST,
      port: env.REDIS3_PORT,
      password: env.REDIS3_PASSWORD,
      db: env.REDIS3_DB,
    },
  },
  middlewares: {
    rabbitmq: env.RABBITMQ_URI,
    meilisearch: {
      meilisearch_uri: env.MEILISEARCH_URI,
      meilisearch_key: env.MEILISEARCH_KEY,
    },
  },
  google: {
    client_id: env.GOOGLE_CLIENT_ID,
    client_secret: env.GOOGLE_CLIENT_SECRET,
    map_api_key: env.GOOGLE_MAP_API_KEY,
  },
  sendgrid: {
    api_key: env.SENDGRID_API_KEY,
    authenticated_sender: env.SENDGRID_AUTHENTICATED_SENDER,
  },
  appSaltRounds: env.APP_SALT_ROUNDS,
  stripe: {
    pk: env.STRIPE_PK,
    sk: env.STRIPE_SK,
    webhook_secret: env.STRIPE_WEBHOOK_SECRET,
    price_id_item1: env.STRIPE_PRICE_ID_ITEM1,
    price_id_item2: env.STRIPE_PRICE_ID_ITEM2,
    price_id_item3: env.STRIPE_PRICE_ID_ITEM3,
  },
});
