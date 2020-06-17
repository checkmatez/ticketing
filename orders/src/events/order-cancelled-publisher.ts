import { OrderCancelledEvent, Publisher, Subject } from '@chm-tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subject.OrderCancelled;
}
