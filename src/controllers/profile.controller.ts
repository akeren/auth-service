import { Request, Response } from 'express';

export function profileController(req: Request, res: Response): Response {
  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: 'User profile successfully retrieved.',
    data: req.currentUser,
  });
}
