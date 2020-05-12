import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { sign } from 'jsonwebtoken';
import { BadRequestError } from '../errors/bad-request-error';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';

export const signupRouter = express.Router();

signupRouter.post(
  '/api/users/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (await User.exists({ email })) {
      throw new BadRequestError('Email is in use');
    }

    const user = User.build({ email, password });
    await user.save();

    const jwt = sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!,
    );

    req.session = { jwt };

    res.status(201).send(user);
  },
);
