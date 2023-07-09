import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../config';
import { UnauthorizedError } from '../errors';
import { IJwtPayload } from '../services';

declare global {
  namespace Express {
    interface Request {
      currentUser?: IJwtPayload;
    }
  }
}

export const currentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  if (!req.session?.jwt) {
    return next();
  }

  try {
    const payload = verify(req.session.jwt, jwtConfig.secret) as IJwtPayload;

    req.currentUser = payload;
  } catch (error) {
    console.log(error);

    throw new UnauthorizedError('Unable to verify authentication token!');
  }

  next();
};
