import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import express from 'express';
import 'express-async-errors';
import { errorHandler, NotFoundError, currentUser } from '@chm-tickets/common';
import { createTicketRouter } from './routes/new';

export const app = express();

app.set('trust proxy', true); // Trust Nginx ingress
app.use(json());
app.use(cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' }));
app.use(currentUser);

app.use(createTicketRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);
