import { broker } from '../pubsub/broker';
import { Topics } from '../pubsub/topics';

export class GpsPublisher {
  publishLocation(cargaId: string, latitude: number, longitude: number, cidade: string) {
    const payload = {
      cargaId,
      latitude,
      longitude,
      cidade,
      timestamp: new Date().toISOString(),
    };
    broker.publish(Topics.LOCATION, payload);
  }
}

export const gpsPublisher = new GpsPublisher();
