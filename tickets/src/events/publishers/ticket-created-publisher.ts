import { Publisher, TicketCreatedEvent, Subject } from '@chm-tickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subject.TicketCreated;
}
