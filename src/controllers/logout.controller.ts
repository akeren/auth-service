import { Request, Response } from 'express';

export function logoutController(req: Request, res: Response): Response {
  req.session = null;

  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: 'Logged out successfully.',
    data: null,
  });
}
