import { Subject } from './subjects';

export interface TicketUpdatedEvent {
  subject: Subject.TicketUpdated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
