import 'express-async-errors';
import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env not set.');
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env not set.');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on 3000!!!');
  });
};

start();
