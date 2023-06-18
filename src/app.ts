import express, { Express, Request, Response } from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { appConfig } from './config';
import { errorHandler } from './middlewares';
import { registerRouter, profileRouter, loginRouter, logoutRouter } from './routes';
import { NotFoundError } from './errors/not-found.error';

const app: Express = express();

const { environment } = appConfig;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true);

app.use(
  cookieSession({
    signed: false,
    secure: environment !== 'development',
  })
);

// Routes
app.use(registerRouter);
app.use(loginRouter);
app.use(profileRouter);
app.use(logoutRouter);

app.all('*', async (req: Request, res: Response): Promise<void> => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this Server!`);
});

app.use(errorHandler);

export { app };
