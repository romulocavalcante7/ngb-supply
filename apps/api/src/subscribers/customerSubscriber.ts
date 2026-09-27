import { Subscriber, EventPayload } from '../pubsub/types';
import { broker } from '../pubsub/broker';
import { Topics } from '../pubsub/topics';

export class CustomerSubscriber implements Subscriber {
  id = 'CustomerSubscriber';

  constructor() {
    broker.subscribe(Topics.LOCATION, this);
    broker.subscribe(Topics.STATUS, this);
  }

  onMessage(topic: string, message: EventPayload): void {
    console.log(`[Customer] Recebeu atualização de ${topic}:`, message);
    // Aqui poderiamos emitir via WebSocket especificamente para a UI do cliente
  }
}

export const customerSubscriber = new CustomerSubscriber();
