import { Query } from 'mongoose';
import { RedisService, ICacheOptions } from '../services';

declare module 'mongoose' {
  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType> {
    cache(option: ICacheOptions): this;

    useCache: boolean;
    cacheKeyToUse: string;
  }
}

const redisClient = new RedisService();

(async () => await redisClient.connect())();

Query.prototype.cache = function (options: ICacheOptions = {}) {
  this.useCache = true;

  this.cacheKeyToUse = JSON.stringify(options.key || '');

  return this;
};

const exec = Query.prototype.exec;

Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments as any);
  }

  const cacheField = JSON.stringify({
    ...this.getQuery(),
    collection: this.model.collection.collectionName,
  });

  const cacheValue = await redisClient.getValue(this.cacheKeyToUse);

  if (cacheValue.length > 0) {
    const doc = JSON.parse(cacheValue as unknown as string);

    console.log(`RETRIEVING FROM THE CACHE`);

    return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
  }

  const result = await exec.apply(this, arguments as any);

  result.length > 0 ? await redisClient.setValue(cacheField, JSON.stringify(result), this.cacheKeyToUse) : '';

  return result;
};

export async function clearCacheData(hashKey: string) {
  return await redisClient.clearCacheData(hashKey);
}
