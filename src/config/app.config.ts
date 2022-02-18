import { IApp } from './interfaces';

const app: IApp = {
  name: process.env.APP_NAME || 'Auth service API',
  port: process.env.APP_PORT || '3008',
  host: process.env.APP_HOST || 'http://127.0.0.1',
  environment: process.env.APP_ENV || 'production',
};

export { app };
