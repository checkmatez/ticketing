import { OrderCancelledListener } from '../order-cancelled-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Ticket } from '../../../models/ticket';
import { OrderCancelledEvent, OrderStatus } from '@chm-tickets/common';

const fakeId = '5efb8a95b3b9995358d25e96';

const setup = async () => {
  const listener = new OrderCancelledListener(natsWrapper.getClient());
  const ticket = Ticket.build({
    title: 'concert',
    price: 99,
    userId: 'asdf',
  });
  ticket.set({ orderId: fakeId });
  await ticket.save();

  const data: OrderCancelledEvent['data'] = {
    id: fakeId,
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  const msg = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it('updates the ticket', async () => {
  const { listener, data, msg, ticket } = await setup();

  await listener.onMessage(data, msg as any);

  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.orderId).toBeUndefined();
  expect(natsWrapper.getClient().publish).toBeCalled();
  expect(msg.ack).toBeCalled();
});
