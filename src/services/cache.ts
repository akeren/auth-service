import { Query } from 'mongoose';
import { RedisService } from '../services';

const redisClient = new RedisService();

(async () => await redisClient.connect())();

const exec = Query.prototype.exec;

Query.prototype.exec = async function () {
  console.log(`I'M ABOUT TO RUN A QUERY`);

  const cacheKey = JSON.stringify({
    ...this.getQuery(),
    collection: this.model.collection.collectionName,
  });

  const cacheValue = await redisClient.getValue(cacheKey);

  if (cacheValue) {
    return JSON.parse(cacheValue);
  }

  const result = await exec.apply(this, arguments as any);

  redisClient.setValue(cacheKey, JSON.stringify(result));

  return result;
};
