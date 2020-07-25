import { ExpirationCompleteEvent, OrderStatus } from '@chm-tickets/common'
import { Order } from '../../../models/order'
import { Ticket } from '../../../models/ticket'
import { natsWrapper } from '../../../nats-wrapper'
import { ExpirationCompleteListener } from '../expiration-complete-listener'

const fakeId = '5efb8a95b3b9995358d25e96'
const client = natsWrapper.getClient()

const setup = async () => {
  const listener = new ExpirationCompleteListener(natsWrapper.getClient())
  const ticket = Ticket.build({
    id: fakeId,
    title: 'concert',
    price: 20,
  })
  await ticket.save()

  const order = Order.build({
    status: OrderStatus.Created,
    userId: 'asd',
    expiresAt: new Date(),
    ticket,
  })
  await order.save()

  const data: ExpirationCompleteEvent['data'] = {
    orderId: order.id,
  }

  const msg = {
    ack: jest.fn(),
  }

  return { listener, order, ticket, data, msg }
}

it('updates the status to cancelled', async () => {
  const { listener, data, msg, order } = await setup()

  await listener.onMessage(data, msg as any)

  const updatedOrder = await Order.findById(order.id)
  expect(updatedOrder!.status).toBe(OrderStatus.Cancelled)
})

it('emit an OrderCancelled event', async () => {
  const { listener, data, msg } = await setup()

  await listener.onMessage(data, msg as any)

  expect(natsWrapper.getClient().publish).toBeCalled()
})

it('acks the message', async () => {
  const { listener, data, msg } = await setup()

  await listener.onMessage(data, msg as any)

  expect(msg.ack).toBeCalled()
})
