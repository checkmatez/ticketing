import express from 'express';

export const signinRouter = express.Router();

signinRouter.post('/api/users/signin', (req, res) => {
  res.send('Hi there');
});
