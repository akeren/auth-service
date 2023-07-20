import { Query } from 'mongoose';
import { RedisService } from '../services';

declare module 'mongoose' {
  interface Query<ResultType, DocType, THelpers = {}, RawDocType = DocType> {
    cache(): this;

    useCache: boolean;
  }
}

const redisClient = new RedisService();

(async () => await redisClient.connect())();

Query.prototype.cache = function () {
  this.useCache = true;

  return this;
};

const exec = Query.prototype.exec;

Query.prototype.exec = async function () {
  if (!this.useCache) {
    return exec.apply(this, arguments as any);
  }

  const cacheKey = JSON.stringify({
    ...this.getQuery(),
    collection: this.model.collection.collectionName,
  });

  const cacheValue = await redisClient.getValue(cacheKey);

  if (cacheValue) {
    const doc = JSON.parse(cacheValue);

    console.log(`RETRIEVING FROM THE CACHE`);

    return Array.isArray(doc) ? doc.map(d => new this.model(d)) : new this.model(doc);
  }

  const result = await exec.apply(this, arguments as any);

  redisClient.setValue(cacheKey, JSON.stringify(result));

  return result;
};
