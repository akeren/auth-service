import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send(err.serializeErrors());
  }

  return res.status(400).json({
    status: false,
    code: res.statusCode,
    errors: [{ message: 'Something went wrong!' }],
  });
};
