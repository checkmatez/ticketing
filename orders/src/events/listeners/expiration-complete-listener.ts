import {
  ExpirationCompleteEvent,
  Listener,
  OrderStatus,
  Subject,
} from '@chm-tickets/common'
import { Message } from 'node-nats-streaming'
import { Order } from '../../models/order'
import { OrderCancelledPublisher } from '../order-cancelled-publisher'
import { QUEUE_GROUP_NAME } from './queue-group-name'

export class ExpirationCompleteListener extends Listener<
  ExpirationCompleteEvent
> {
  readonly subject = Subject.ExpirationComplete
  queueGroupName = QUEUE_GROUP_NAME

  async onMessage({ orderId }: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(orderId).populate('ticket')

    if (!order) {
      throw new Error('order not found')
    }
    if (order.status === OrderStatus.Complete) {
      return msg.ack()
    }

    order.set({
      status: OrderStatus.Cancelled,
    })
    await order.save()

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    })

    msg.ack()
  }
}
