import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError, OrderStatus } from '@chm-tickets/common';
import { Order } from '../models/order';

export const deleteRouter = express.Router();

deleteRouter.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId);

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  res.status(204).send(order);
});
