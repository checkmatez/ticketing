import { TicketUpdatedEvent } from '@chm-tickets/common'
import { Ticket } from '../../../models/ticket'
import { natsWrapper } from '../../../nats-wrapper'
import { TicketUpdatedListener } from '../ticket-updated-listener'

const fakeId = '5efb8a95b3b9995358d25e96'

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.getClient())

  const ticket = Ticket.build({
    id: fakeId,
    price: 20,
    title: 'concert',
  })
  await ticket.save()

  const data: TicketUpdatedEvent['data'] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: 'new concert',
    price: 30,
    userId: 'asd1',
  }

  const msg = {
    ack: jest.fn(),
  }

  return { listener, data, msg, ticket }
}

it('finds, updates and saves a ticket', async () => {
  const { listener, data, msg, ticket } = await setup()

  await listener.onMessage(data, msg as any)

  await expect(Ticket.findById(data.id)).resolves.toMatchSnapshot()
})

it('acks the message', async () => {
  const { listener, data, msg } = await setup()
  await listener.onMessage(data, msg as any)

  expect(msg.ack).toBeCalled()
})

it('does not call ack if the event skipped version number', async () => {
  const { listener, data, msg } = await setup()
  data.version = 10

  await expect(listener.onMessage(data, msg as any)).rejects.toThrow()

  expect(msg.ack).not.toBeCalled()
})
