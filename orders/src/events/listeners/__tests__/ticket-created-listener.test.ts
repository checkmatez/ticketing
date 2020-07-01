import { TicketCreatedEvent } from '@chm-tickets/common';
import mongoose from 'mongoose';
import { Ticket } from '../../../models/ticket';
import { natsWrapper } from '../../../nats-wrapper';
import { TicketCreatedListener } from '../ticket-created-listener';

const fakeId = '5efb8a95b3b9995358d25e96';

const setup = () => {
  const listener = new TicketCreatedListener(natsWrapper.getClient());
  const data: TicketCreatedEvent['data'] = {
    id: fakeId,
    price: 20,
    title: 'concert',
    userId: 'asd1',
    version: 0,
  };

  const msg = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves a ticket', async () => {
  const { listener, data, msg } = setup();

  await listener.onMessage(data, msg as any);

  await expect(Ticket.findById(data.id)).resolves.toMatchSnapshot();
});

it('acks the message', async () => {
  const { listener, data, msg } = setup();
  await listener.onMessage(data, msg as any);

  expect(msg.ack).toBeCalled();
});
