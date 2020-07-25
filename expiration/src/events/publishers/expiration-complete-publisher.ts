import {
  Publisher,
  ExpirationCompleteEvent,
  Subject,
} from '@chm-tickets/common'

export class ExpirationCompletePublisher extends Publisher<
  ExpirationCompleteEvent
> {
  readonly subject = Subject.ExpirationComplete
}
