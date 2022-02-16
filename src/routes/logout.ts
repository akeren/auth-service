import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/api/users/logout', (req: Request, res: Response) => {
  req.session = null;

  res.status(200).json({
    status: true,
    code: res.statusCode,
    message: 'Logged out successfully.',
    data: null,
  });
});

export { router as logoutRouter };
