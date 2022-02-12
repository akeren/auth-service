import { Router, Request, Response } from 'express';

const router: Router = Router();

router.post('/api/users/login', (req: Request, res: Response) => {
  res.status(200).json({
    status: true,
    code: 200,
    message: 'Welcome to the API',
    data: null,
  });
});

export { router as loginRouter };
