import { Request, Response } from 'express';
import { User } from '../models/user.model';
import { BadRequestError } from '../errors';
import { Password, Jwt } from '../services';
import { UserDto } from '../dtos';

export async function loginController(req: Request, res: Response): Promise<Response> {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    throw new BadRequestError('Invalid login credentials.');
  }

  if (!(await Password.compare(user.password, password))) {
    throw new BadRequestError('Invalid login credentials.');
  }

  const jwt = new Jwt(user);

  const token = jwt.sign();

  const expiredAt = jwt.decodeAccessToken(token).exp;

  req.session = {
    jwt: token,
  };

  return res.status(200).json({
    status: true,
    code: res.statusCode,
    message: 'Logged in successfully.',
    data: new UserDto(user),
    jwt: {
      token: token,
      expiredAt,
    },
  });
}
