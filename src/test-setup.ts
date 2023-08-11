import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from './app';

declare global {
  function getAuthCookie(): Promise<string[]>;
}

let mongoServer: MongoMemoryServer;

beforeAll(async (): Promise<void> => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri(), { dbName: 'auth' });
});

beforeAll(async (): Promise<void> => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async (): Promise<void> => {
  await mongoServer.stop();
  await mongoose.disconnect();
});

global.getAuthCookie = async (): Promise<string[]> => {
  const email = 'monique@dev.io';
  const password = 'password';

  const response = await request(app)
    .post('/api/v1/auth/register')
    .send({
      email,
      password,
    })
    .expect(201);

  return response.get('Set-Cookie');
};
