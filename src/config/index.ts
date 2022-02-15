import '@src/config/env.config';
import { app } from '@src/config/app.config';
import { mongo } from '@src/config/mongo.config';
import { jwt } from '@src/config/jwt.config';

export { app as appConfig, mongo, jwt as jwtConfig };
