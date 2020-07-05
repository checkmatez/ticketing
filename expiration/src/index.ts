import { natsWrapper } from './nats-wrapper'
import { OrderCreatedListener } from './events/listeners/order-created-listener'

const start = async () => {
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID env not set.')
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL env not set.')
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID env not set.')
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL,
    )
    natsWrapper.getClient().on('close', () => {
      console.log('Connection to NATS closed.')
      process.exit()
    })

    new OrderCreatedListener(natsWrapper.getClient()).listen()

    process.on('SIGINT', () => {
      natsWrapper.getClient().close()
    })

    process.on('SIGTERM', () => {
      natsWrapper.getClient().close()
    })
  } catch (error) {
    console.error(error)
  }
}

start()
