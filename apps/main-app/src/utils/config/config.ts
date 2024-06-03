export default () => ({
  currentEnv: process.env.NODE_ENV,
  mainApp: {
    host: process.env.host,
    port: parseInt(process.env.PORT, 10) || 3000,
  },
  databases: {
    main_database: {
      main_host: process.env.DATABASE_MAIN_HOST,
      main_port: parseInt(process.env.DATABASE_MAIN_PORT, 10) || 3306,
      main_username: process.env.DATABASE_MAIN_USERNAME,
      main_password: process.env.DATABASE_MAIN_PASSWORD,
      main_database: process.env.DATABASE_MAIN_DATABASE,
    },
    sec_database: {
      sec_host: process.env.DATABASE_SEC_HOST,
      sec_port: parseInt(process.env.DATABASE_SEC_PORT, 10) || 3306,
      sec_username: process.env.DATABASE_SEC_USERNAME,
      sec_password: process.env.DATABASE_SEC_PASSWORD,
      sec_database: process.env.DATABASE_SEC_DATABASE,
    },
  },
  redis: {
    db0: {
      host: process.env.REDIS1_HOST,
      port: parseInt(process.env.REDIS1_PORT, 10) || 6379,
      password: process.env.REDIS1_PASSWORD,
      db: parseInt(process.env.REDIS1_DB, 10) || 0,
    },
    db1: {
      host: process.env.REDIS2_HOST,
      port: parseInt(process.env.REDIS2_PORT, 10) || 6379,
      password: process.env.REDIS2_PASSWORD,
      db: parseInt(process.env.REDIS2_DB, 10) || 1,
    },
    db2: {
      host: process.env.REDIS3_HOST,
      port: parseInt(process.env.REDIS3_PORT, 10) || 6379,
      password: process.env.REDIS3_PASSWORD,
      db: parseInt(process.env.REDIS3_DB, 10) || 2,
    },
    db3: {
      host: process.env.REDIS4_HOST,
      port: parseInt(process.env.REDIS4_PORT, 10) || 6379,
      password: process.env.REDIS4_PASSWORD,
      db: parseInt(process.env.REDIS4_DB, 10) || 3,
    },
  },
  middlewares: {
    rabbitmq: process.env.RABBITMQ_URI,
    meilisearch: {
      meilisearch_uri: process.env.MEILISEARCH_URI,
      meilisearch_key: process.env.MEILISEARCH_KEY,
    },
  },
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    map_api_key: process.env.GOOGLE_MAP_API_KEY,
  },
  sendgrid: {
    api_key: process.env.SENDGRID_API_KEY,
    authenticated_sender: process.env.SENDGRID_AUTHENTICATED_SENDER,
  },
  appSaltRounds: parseInt(process.env.APP_SALT_ROUNDS, 10) || 10,
  stripe: {
    pk: process.env.STRIPE_PK,
    sk: process.env.STRIPE_SK,
    webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
    price_id_item1: process.env.STRIPE_PRICE_ID_ITEM1,
    price_id_item2: process.env.STRIPE_PRICE_ID_ITEM2,
    price_id_item3: process.env.STRIPE_PRICE_ID_ITEM3,
  },
});
