import { RedisClientType, createClient } from 'redis';

export class RedisService {
  private redisClient: RedisClientType;

  constructor(private readonly url?: string) {
    this.redisClient = createClient({ url: this.url });

    this.redisClient.on('error', err => console.log(`Redis Client Error:`, err));
  }

  async connect(): Promise<void> {
    return await this.redisClient.connect();
  }

  async disconnect(): Promise<void> {
    return await this.disconnect();
  }

  async setValue(cacheField: string, value: string, hKey: string): Promise<number | null> {
    const redisCacheValue = await this.redisClient.hSet(hKey, cacheField, value);

    await this.redisClient.expire(hKey, 86400);

    return redisCacheValue;
  }

  async getValue(hKey: string): Promise<string[]> {
    return await this.redisClient.hVals(hKey);
  }
}
