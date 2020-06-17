import request from 'supertest';
import { app } from '../../app';
import { Ticket } from '../../models/ticket';
import { OrderStatus } from '../../models/order';

it('marks an order as cancelled', async () => {
  const ticket = await Ticket.build({ title: 'concert', price: 20 }).save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app).delete(`/api/orders/${order.id}`).set('Cookie', user).send().expect(204);

  const { body: result } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(result.status).toEqual(OrderStatus.Cancelled);
});

it.todo('publishes an event order:cancelled');
