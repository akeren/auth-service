import { Request, Response, NextFunction } from 'express';
import { UnauthorizedError } from '@src/errors';
import { User } from '@src/models/user.model';

export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.currentUser) {
    throw new UnauthorizedError('You are not logged in! Please login to get access.');
  }

  if (!(await User.findById(req.currentUser.id))) {
    throw new UnauthorizedError('The user belonging to this token does no longer exist.');
  }

  next();
};
