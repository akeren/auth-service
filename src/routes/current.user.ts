import { Request, Response, Router } from 'express';

const router: Router = Router();

router.get('/api/users/me', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    code: 200,
    message: 'Welcome to the API',
    data: null,
  });
});

export { router as currentUserRouter };
