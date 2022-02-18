import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from '../config';
import { IJwtPayload } from './interfaces';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    // eslint-disable-next-line no-shadow
    interface Request {
      currentUser?: IJwtPayload;
    }
  }
}

// eslint-disable-next-line consistent-return
export const currentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, jwtConfig.secret) as IJwtPayload;

    req.currentUser = payload;
    // eslint-disable-next-line no-empty
  } catch (error) {}

  next();
};
