import { Subject } from './subjects';

export interface TicketCreatedEvent {
  subject: Subject.TicketCreated;
  data: {
    id: string;
    version: number;
    title: string;
    price: number;
    userId: string;
  };
}
