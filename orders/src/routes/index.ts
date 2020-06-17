import express, { Request, Response } from 'express';
import { requireAuth } from '@chm-tickets/common';
import { Order } from '../models/order';

export const indexRouter = express.Router();

indexRouter.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('ticket');

  res.send(orders);
});
