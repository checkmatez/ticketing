import { Publisher, TicketUpdatedEvent, Subject } from '@chm-tickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subject.TicketUpdated;
}
