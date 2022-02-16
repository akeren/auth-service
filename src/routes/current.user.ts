import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '@src/errors';
import { jwtConfig } from '@src/config';
import { User } from '@src/models/user.model';

const router: Router = Router();

router.get('/api/users/me', async (req: Request, res: Response) => {
  if (!req.session?.jwt) {
    throw new UnauthorizedError('You are not logged in! Please login to get access.');
  }

  try {
    const payload = jwt.verify(req.session.jwt, jwtConfig.secret);

    const { id } = payload as { id: string };

    const user = await User.findById(id);

    if (!user) {
      throw new UnauthorizedError('The user belonging to this token does no longer exist.');
    }

    return res.status(200).json({
      success: true,
      code: res.statusCode,
      message: 'User profile successfully retrieved.',
      data: user,
    });
  } catch (error) {
    throw new UnauthorizedError('You are not logged in! Please login to get access.');
  }
});

export { router as currentUserRouter };
