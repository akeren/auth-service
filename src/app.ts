import express, { Express, Request, Response } from 'express';
import 'express-async-errors';
import './services/cache';
import cookieSession from 'cookie-session';
import { appConfig } from './config';
import { errorHandler } from './middlewares';
import { registerRouter, profileRouter, loginRouter, logoutRouter } from './routes/auth';
import { createArticleRouter, getAllArticlesRouter, getArticleRouter, getAuthorArticlesRouter } from './routes/article';
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
app.use('/api/v1/auth', logoutRouter);
app.use('/api/v1/auth', registerRouter);
app.use('/api/v1/auth', loginRouter);
app.use('/api/v1/auth', profileRouter);
app.use('/api/v1/articles', getAuthorArticlesRouter);
app.use('/api/v1/articles', getArticleRouter);
app.use('/api/v1/articles', createArticleRouter);
app.use('/api/v1/articles', getAllArticlesRouter);

app.all('*', async (req: Request, res: Response): Promise<void> => {
  throw new NotFoundError(`Can't find ${req.originalUrl} on this Server!`);
});

app.use(errorHandler);

export { app };
