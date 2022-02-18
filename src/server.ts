import { createServer, Server } from 'http';
import { connect } from 'mongoose';
import { appConfig, mongo } from './config';
import { app } from './app';

const { name, port, host } = appConfig;

const server: Server = createServer(app);

(async (): Promise<void> => {
  try {
    await connect(`${mongo.host}:${mongo.port}/${mongo.dbName}`);

    server.listen(port, () => {
      console.info(`${name} running on ${host}:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
