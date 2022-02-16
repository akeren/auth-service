import { Request, Response, Router } from 'express';
import { currentUser, requireAuth } from '@src/middlewares';

const router: Router = Router();

router.get('/api/users/me', currentUser, requireAuth, (req: Request, res: Response) => {
  return res.status(200).json({
    success: true,
    code: res.statusCode,
    message: 'User profile successfully retrieved.',
    data: req.currentUser,
  });
});

export { router as currentUserRouter };
