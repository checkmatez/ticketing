import express, { Request, Response } from 'express';
import { requireAuth, NotFoundError, NotAuthorizedError, OrderStatus } from '@chm-tickets/common';
import { Order } from '../models/order';
import { OrderCancelledPublisher } from '../events/order-cancelled-publisher';
import { natsWrapper } from '../nats-wrapper';

export const deleteRouter = express.Router();

deleteRouter.delete('/api/orders/:orderId', requireAuth, async (req: Request, res: Response) => {
  const order = await Order.findById(req.params.orderId).populate('ticket');

  if (!order) {
    throw new NotFoundError();
  }

  if (order.userId !== req.currentUser!.id) {
    throw new NotAuthorizedError();
  }

  order.status = OrderStatus.Cancelled;
  await order.save();

  new OrderCancelledPublisher(natsWrapper.getClient()).publish({
    id: order.id,
    ticket: {
      id: order.ticket.id,
    },
  });

  res.status(204).send(order);
});
