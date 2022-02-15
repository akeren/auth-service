import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { body } from 'express-validator';
import { validateRequest } from '@src/middlewares';
import { User } from '@src/models/user.model';
import { BadRequestError } from '@src/errors';
import { Password } from '@src/utils';
import { jwtConfig } from '@src/config';

const router: Router = Router();

router.post(
  '/api/users/login',
  [
    body('email').isEmail().withMessage('Email must be valid.'),
    body('password').trim().notEmpty().withMessage('You must provide a password.'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      throw new BadRequestError('Invalid login credentials.');
    }

    if (!(await Password.compare(user.password, password))) {
      throw new BadRequestError('Invalid login credentials.');
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      jwtConfig.secret,
      {
        expiresIn: jwtConfig.expiryTime,
      }
    );

    req.session = {
      jwt: token,
    };

    res.status(200).json({
      status: true,
      code: res.statusCode,
      message: 'Logged in successfully.',
      data: user,
    });
  }
);

export { router as loginRouter };
