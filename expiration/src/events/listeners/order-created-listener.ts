import { Listener, OrderCreatedEvent, Subject } from '@chm-tickets/common'
import { Message } from 'node-nats-streaming'
import { QUEUE_GROUP_NAME } from './queue-group-name'
import { expirationQueue } from '../../queues/expiration-queue'

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subject.OrderCreated
  queueGroupName = QUEUE_GROUP_NAME

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    await expirationQueue.add({ orderId: data.id })
    msg.ack()
  }
}
