import { IMongo } from '@src/config/interface';

const mongo: IMongo = {
  host: process.env.MONGO_DB_HOST || '',
  port: process.env.MONGO_DB_PORT || '',
  dbName: process.env.MONGO_DB_NAME || '',
  password: process.env.MONGO_DB_PASSWORD || '',
};

export { mongo };
