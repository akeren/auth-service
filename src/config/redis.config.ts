import { IRedis } from './interfaces';

const redis: IRedis = {
  url: process.env.REDIS_URL || 'redis://127.0.0.1',
  port: process.env.REDIS_PORT || '6379',
};

export { redis };
