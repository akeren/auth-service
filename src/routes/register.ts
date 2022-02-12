import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '@src/errors/request-validation.error';
import { BadRequestError } from '@src/errors/bad-request.error';
import { User } from '@src/models/user.model';

const router: Router = Router();

router.post(
  '/api/users/register',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().isLength({ min: 4, max: 20 }).withMessage('Password must contain at least 4 characters'),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new RequestValidationError(errors.array());
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email already in use');
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send({
      status: true,
      code: res.statusCode,
      message: 'Account created successfully',
      data: user,
    });
  }
);

export { router as registerRouter };
