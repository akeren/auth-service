import express, { Express, Request, Response } from 'express';
import 'express-async-errors';
import { errorHandler } from '@src/middlewares/error.handler';
import { currentUserRouter } from '@src/routes/current.user';
import { loginRouter } from '@src/routes/login';
import { logoutRouter } from '@src/routes/logout';
import { registerRouter } from '@src/routes/register';
import { NotFoundError } from '@src/errors/not-found.error';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(registerRouter);
app.use(loginRouter);
app.use(currentUserRouter);
app.use(logoutRouter);

// eslint-disable-next-line no-unused-vars
app.all('*', async (req: Request, res: Response) => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this Server!`);
});

app.use(errorHandler);

export { app };
