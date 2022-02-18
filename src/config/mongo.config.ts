import { IMongo } from './interfaces';

const mongo: IMongo = {
  host: process.env.MONGO_DB_HOST || 'mongodb://127.0.0.1',
  port: process.env.MONGO_DB_PORT || '27017',
  dbName: process.env.MONGO_DB_NAME || 'auth',
  password: process.env.MONGO_DB_PASSWORD || '',
};

export { mongo };
