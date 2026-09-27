import { Subscriber, EventPayload } from '../pubsub/types';
import { broker } from '../pubsub/broker';
import { Topics } from '../pubsub/topics';
import { prisma } from '../database/prisma';

export class TelemetrySubscriber implements Subscriber {
  id = 'TelemetrySubscriber';

  constructor() {
    broker.subscribe(Topics.LOCATION, this);
    broker.subscribe(Topics.TEMPERATURE, this);
    broker.subscribe(Topics.DOOR, this);
  }

  async onMessage(topic: string, message: EventPayload): Promise<void> {
    console.log(`[Telemetry] Gravando métrica para ${topic}:`, message);
    try {
      await prisma.event.create({
        data: {
          loadId: message.cargaId,
          topic,
          type: topic.toUpperCase().replace('CARGA.', '') + '_UPDATED',
          payload: message as any,
        }
      });
    } catch (e) {
      console.error('[Telemetry] Erro ao salvar evento no DB:', e);
    }
  }
}

export const telemetrySubscriber = new TelemetrySubscriber();
