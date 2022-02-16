import { Router, Request, Response } from 'express';
import { currentUser, requireAuth } from '@src/middlewares';

const router: Router = Router();

router.post('/api/users/logout', currentUser, requireAuth, (req: Request, res: Response) => {
  req.session = null;

  res.status(200).json({
    status: true,
    code: res.statusCode,
    message: 'Logged out successfully.',
    data: null,
  });
});

export { router as logoutRouter };
