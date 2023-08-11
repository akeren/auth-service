import { Request, Response, NextFunction } from 'express';
import { clearCacheData } from '../services';

export async function clearUserCacheAfterPostCreation(req: Request, res: Response, next: NextFunction) {
  await next();

  clearCacheData(String(req.currentUser?.id));
}
