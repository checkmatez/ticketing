import nats, { Stan } from 'node-nats-streaming';

class NatsWrapper {
  private client?: Stan;

  getClient() {
    if (!this.client) {
      throw new Error('NATS client not initialized.');
    }
    return this.client;
  }

  connect(clusterId: string, clientId: string, url: string) {
    this.client = nats.connect(clusterId, clientId, { url });

    return new Promise((resolve, reject) => {
      this.getClient().on('connect', () => {
        console.log('Connected to NATS');
        resolve();
      });
      this.getClient().on('error', (err) => reject(err));
    });
  }
}

export const natsWrapper = new NatsWrapper();
