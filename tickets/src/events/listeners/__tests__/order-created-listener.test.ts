import { OrderCreatedListener } from '../order-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { OrderCreatedEvent, OrderStatus } from '@chm-tickets/common';

const fakeId = '5efb8a95b3b9995358d25e96';

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.getClient());
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf',
  });
  await ticket.save();

  const data: OrderCreatedEvent['data'] = {
    id: fakeId,
    version: 0,
    status: OrderStatus.Created,
    userId: 'asd',
    expiresAt: 'asdf',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  const msg = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it('sets the userId of he ticket', async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg as any);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.id).toBe(ticket.id);
});

it('acks the message', async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg as any);
  expect(msg.ack).toBeCalled();
});

it('publishes a ticket updated event', async () => {
  const { listener, ticket, data, msg } = await setup();

  await listener.onMessage(data, msg as any);

  expect(natsWrapper.getClient().publish).toBeCalled();
});
