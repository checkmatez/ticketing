import { Publisher } from '../../../common/src/events/base-publisher';
import { TicketCreatedEvent } from '../../../common/src/events/ticket-created-event';
import { Subject } from '../../../common/src/events/subjects';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subject.TicketCreated;
}
