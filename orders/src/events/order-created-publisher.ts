import { OrderCreatedEvent, Publisher, Subject } from '@chm-tickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject = Subject.OrderCreated;
}
