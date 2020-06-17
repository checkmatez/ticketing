import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';

it('returns 401 if user belongs to another user', async () => {
  const ticket = await Ticket.build({ title: 'concert', price: 20 }).save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});

it('fetches an order', async () => {
  const ticket = await Ticket.build({ title: 'concert', price: 20 }).save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: result } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(result.id).toEqual(order.id);
});
