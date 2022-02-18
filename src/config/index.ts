import './env.config';
import { app } from './app.config';
import { mongo } from './mongo.config';
import { jwt } from './jwt.config';

export { app as appConfig, mongo, jwt as jwtConfig };
