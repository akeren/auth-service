import { Router, Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestError } from '@src/errors';
import { validateRequest } from '@src/middlewares';
import { User } from '@src/models/user.model';
import { jwtConfig } from '@src/config';

const router: Router = Router();

router.post(
  '/api/users/register',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must contain at least 4 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }

    const user = User.build({ email, password });
    await user.save();

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

    res.status(201).send({
      status: true,
      code: res.statusCode,
      message: 'Account created successfully',
      data: user,
    });
  }
);

export { router as registerRouter };
