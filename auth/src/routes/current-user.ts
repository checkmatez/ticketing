import express from 'express';

export const currentUserRouter = express.Router();

currentUserRouter.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there');
});
