import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';
import { BadRequestError } from '../errors';
import { User } from '../models/user.model';
import { jwtConfig } from '../config';

export async function registerController(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new BadRequestError('Email already in use');
  }

  const user = User.build({ email, password });
  await user.save();

  const token = sign(
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

  return res.status(201).send({
    status: true,
    code: res.statusCode,
    message: 'Account created successfully',
    data: user,
  });
}
