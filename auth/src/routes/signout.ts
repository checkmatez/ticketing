import express from 'express';

export const signoutRouter = express.Router();

signoutRouter.post('/api/users/signout', (req, res) => {
  res.send('Hi there');
});
