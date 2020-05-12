import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): Promise<string[]>;
    }
  }
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  process.env.JWT_KEY = 'asdf';
  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  await Promise.all(collections.map((c) => c.deleteMany({})));
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const authResponse = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);
  const cookie = authResponse.get('Set-Cookie');

  return cookie;
};
