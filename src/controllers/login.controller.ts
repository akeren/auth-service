import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { BadRequestError } from '../errors';
import { Password } from '../utils';
import { jwtConfig } from '../config';

export async function loginController(req: Request, res: Response): Promise<Response> {
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

  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: 'Logged in successfully.',
    data: user,
  });
}
