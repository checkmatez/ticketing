import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

export const signinRouter = express.Router();

signinRouter.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').trim().notEmpty().withMessage('Password must not be empty'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const match = await Password.compare(existingUser.password, password);
    if (!match) {
      throw new BadRequestError('Invalid credentials');
    }

    const jwt = sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = { jwt };

    res.status(200).send(existingUser);
  },
);
