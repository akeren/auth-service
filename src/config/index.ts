import './env.config';
import { app } from './app.config';
import { mongo } from './mongo.config';
import { jwt } from './jwt.config';
import { redis } from './redis.config';

export { app as appConfig, mongo, jwt as jwtConfig, redis };
