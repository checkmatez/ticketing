import 'express-async-errors'
import mongoose from 'mongoose'
import { app } from './app'
import { natsWrapper } from './nats-wrapper'
import { OrderCreatedListener } from './events/listeners/order-created-listener'
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY env not set.')
  }
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env not set.')
  }
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
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
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
    new OrderCancelledListener(natsWrapper.getClient()).listen()

    process.on('SIGINT', () => {
      natsWrapper.getClient().close()
    })

    process.on('SIGTERM', () => {
      natsWrapper.getClient().close()
    })
  } catch (error) {
    console.error(error)
  }

  app.listen(3000, () => {
    console.log('Listening on 3000!!!')
  })
}

start()
