import dotenv from 'dotenv-safe';
import { createServer, Server } from 'http';
import { connect } from 'mongoose';
import { app } from '@src/app';

const name = process.env.APP_NAME || 'Auth service API';
const port = process.env.APP_PORT || 3000;
const host = process.env.APP_HOST || 'http://127.0.0.1';

dotenv.config({
  path: '.env',
});

const server: Server = createServer(app);

(async () => {
  try {
    await connect(process.env.MONGO_URI as string);

    server.listen(port, () => {
      console.info(`${name} running on ${host}:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
