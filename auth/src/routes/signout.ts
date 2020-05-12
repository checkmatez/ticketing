import express from 'express';

export const signoutRouter = express.Router();

signoutRouter.post('/api/users/signout', (req, res) => {
  req.session = null;

  res.send({});
});
