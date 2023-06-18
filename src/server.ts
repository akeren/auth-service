import { createServer, Server } from 'http';
import { connect } from 'mongoose';
import { appConfig, mongo } from './config';
import { app } from './app';

const { name, port, host } = appConfig;

const server: Server = createServer(app);

(async (): Promise<void> => {
  try {
    await connect(`mongodb+srv://${mongo.username}:${mongo.password}@${mongo.host}/${mongo.dbName}`);

    server.listen(port, () => {
      console.info(`${name} running on ${host}:${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();
