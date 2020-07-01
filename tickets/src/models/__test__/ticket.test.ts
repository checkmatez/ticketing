import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
  const ticket = Ticket.build({ title: 'concert', price: 5, userId: 'asd1' });
  await ticket.save();

  const firstInstance = await Ticket.findById(ticket.id);
  const secondInstance = await Ticket.findById(ticket.id);

  firstInstance!.set({ price: 10 });
  secondInstance!.set({ price: 15 });

  await firstInstance!.save();
  await expect(secondInstance!.save()).rejects.toThrow();
});

it('increments version on multiple saves', async () => {
  const ticket = Ticket.build({ title: 'concert', price: 5, userId: 'asd1' });

  await ticket.save();
  expect(ticket.version).toBe(0);
  await ticket.save();
  expect(ticket.version).toBe(1);
  await ticket.save();
  expect(ticket.version).toBe(2);
});
