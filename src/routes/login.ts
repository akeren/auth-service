import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '@src/middlewares';

const router: Router = Router();

router.post(
  '/api/users/login',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('You must provide a password'),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.send('OK');
  }
);

export { router as loginRouter };
