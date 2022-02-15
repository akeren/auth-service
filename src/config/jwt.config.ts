import { IJwt } from '@src/config/interface';

const jwt: IJwt = {
  secret: process.env.JWT_SECRET || 'auth-service-with-node-typescript-&-mongodb',
  expiryTime: process.env.JWT_EXPIRES_IN || '2d',
};

export { jwt };
