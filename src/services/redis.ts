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

  async setValue(key: string, value: string): Promise<string | null> {
    return await this.redisClient.set(key, value);
  }

  async getValue(key: string): Promise<string | null> {
    return await this.redisClient.get(key);
  }
}
