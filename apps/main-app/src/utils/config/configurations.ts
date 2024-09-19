export default () => ({
  NODE_ENV: process.env.NODE_ENV, // development, production, test
  // ---------------------------------- main website settings
  PORT: parseInt(process.env.PORT) || 4001,
  HOST: process.env.HOST,
  SESSION_EXPIRE: parseInt(process.env.SESSION_EXPIRE) || 86400,
  // ---------------------------------- database-1 settings
  DATABASES: {
    DATABASE_MAIN_HOST: process.env.DATABASE_MAIN_HOST,
    DATABASE_MAIN_PORT: parseInt(process.env.DATABASE_MAIN_PORT) || 3306,
    DATABASE_MAIN_USERNAME: process.env.DATABASE_MAIN_USERNAME,
    DATABASE_MAIN_PASSWORD: process.env.DATABASE_MAIN_PASSWORD,
    DATABASE_MAIN_DATABASE: process.env.DATABASE_MAIN_DATABASE,
  },
  // ---------------------------------- database-2 settings
  // DATABASE_SEC_HOST: z.string(),
  // DATABASE_SEC_PORT: StringifyNumber,
  // DATABASE_SEC_USERNAME: z.string(),
  // DATABASE_SEC_PASSWORD: z.string(),
  // DATABASE_SEC_DATABASE: z.string(),
  // ---------------------------------- redis-1 settings
  REDIS_CLUSTER: {
    REDIS1_HOST: process.env.REDIS1_HOST,
    REDIS1_PORT: parseInt(process.env.REDIS1_PORT) || 6379,
    REDIS1_PASSWORD: process.env.REDIS1_PASSWORD,
    REDIS1_DB: parseInt(process.env.REDIS1_DB) || 0,
    // ---------------------------------- redis-2 settings
    REDIS2_HOST: process.env.REDIS2_HOST,
    REDIS2_PORT: parseInt(process.env.REDIS2_PORT) || 6379,
    REDIS2_PASSWORD: process.env.REDIS2_PASSWORD,
    REDIS2_DB: parseInt(process.env.REDIS2_DB) || 1,
  },
  // ---------------------------------- redis-3 settings
  // REDIS3_HOST: z.string(),
  // REDIS3_PORT: StringifyNumber,
  // REDIS3_PASSWORD: z.string(),
  // REDIS3_DB: z.string(),
  // ---------------------------------- redis-4 settings
  // REDIS4_HOST: z.string(),
  // REDIS4_PORT: z.string(),
  // REDIS4_PASSWORD: z.string(),
  // REDIS4_DB: z.string(),
  // ---------------------------------- middlewares settings
  // RABBITMQ_URI: z.string(),
  MEILISEARCH_URI: process.env.MEILISEARCH_URI,
  MEILISEARCH_KEY: process.env.MEILISEARCH_KEY,
  // ---------------------------------- google settings
  // GOOGLE_CLIENT_ID: z.string(),
  // GOOGLE_CLIENT_SECRET: z.string(),
  // GOOGLE_MAP_API_KEY: z.string(),
  // ---------------------------------- sendgrid settings
  // SENDGRID_API_KEY: z.string(),
  // SENDGRID_AUTHENTICATED_SENDER: z.string(),
  // ---------------------------------- crypto settings
  APP_SALT_ROUNDS: parseInt(process.env.APP_SALT_ROUNDS) || 10,
  // ---------------------------------- stripe settings
  // STRIPE_PK: z.string(),
  // STRIPE_SK: z.string(),
  // STRIPE_WEBHOOK_SECRET: z.string(),
  // STRIPE_PRICE_ID_ITEM1: z.string(),
  // STRIPE_PRICE_ID_ITEM2: z.string(),
  // STRIPE_PRICE_ID_ITEM3: z.string(),
});
