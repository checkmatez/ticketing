import { Listener } from '../../../common/src/events/base-listener';
import { Message } from 'node-nats-streaming';
import { TicketCreatedEvent } from '../../../common/src/events/ticket-created-event';
import { Subject } from '../../../common/src/events/subjects';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subject.TicketCreated;
  queueGroupName = 'payment-service';

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('event data = ', data);
    msg.ack();
  }
}
