import { broker } from '../pubsub/broker';
import { Topics } from '../pubsub/topics';

export class TemperaturePublisher {
  publishTemperature(cargaId: string, temperatura: number, unidade: string = '°C') {
    const payload = {
      cargaId,
      temperatura,
      unidade,
      timestamp: new Date().toISOString(),
    };
    broker.publish(Topics.TEMPERATURE, payload);
  }
}

export const temperaturePublisher = new TemperaturePublisher();
