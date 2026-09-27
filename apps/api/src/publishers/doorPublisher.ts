import { broker } from '../pubsub/broker';
import { Topics } from '../pubsub/topics';

export class DoorPublisher {
  publishDoorStatus(cargaId: string, status: 'ABERTA' | 'FECHADA') {
    const payload = {
      cargaId,
      status,
      timestamp: new Date().toISOString(),
    };
    broker.publish(Topics.DOOR, payload);
  }
}

export const doorPublisher = new DoorPublisher();
