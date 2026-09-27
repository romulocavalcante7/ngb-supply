import { Subscriber, EventPayload } from '../pubsub/types';
import { broker } from '../pubsub/broker';
import { Topics } from '../pubsub/topics';
import { prisma } from '../database/prisma';

export class RiskSubscriber implements Subscriber {
  id = 'RiskSubscriber';

  constructor() {
    broker.subscribe(Topics.TEMPERATURE, this);
    broker.subscribe(Topics.DOOR, this);
    broker.subscribe(Topics.SPEED, this);
    broker.subscribe(Topics.BATTERY, this);
    broker.subscribe(Topics.ALERT, this);
  }

  onMessage(topic: string, message: EventPayload): void {
    if (topic === Topics.TEMPERATURE) {
      this.handleTemperature(message);
    } else if (topic === Topics.DOOR) {
      this.handleDoor(message);
    } else if (topic === Topics.SPEED) {
      this.handleSpeed(message);
    } else if (topic === Topics.BATTERY) {
      this.handleBattery(message);
    } else if (topic === Topics.ALERT) {
      this.handleAlert(message);
    }
  }

  private async handleAlert(message: EventPayload) {
    try {
      await prisma.alert.create({
        data: {
          loadId: message.cargaId,
          type: message.tipo,
          severity: message.severidade,
          message: message.mensagem,
        }
      });
    } catch(e) {
      console.error('[RiskSubscriber] Erro ao salvar alerta no DB:', e);
    }
  }

  private handleTemperature(message: EventPayload) {
    const { cargaId, temperatura } = message;
    if (temperatura > 10) {
      broker.publish(Topics.ALERT, {
        cargaId,
        tipo: 'TEMPERATURA_ALTA',
        severidade: 'HIGH',
        mensagem: 'Temperatura acima do limite permitido (> 10°C)'
      });
    } else if (temperatura > 8) {
      broker.publish(Topics.ALERT, {
        cargaId,
        tipo: 'TEMPERATURA_ATENCAO',
        severidade: 'MEDIUM',
        mensagem: 'Temperatura em nível de atenção (8°C - 10°C)'
      });
    }
  }

  private handleDoor(message: EventPayload) {
    const { cargaId, status } = message;
    if (status === 'ABERTA') {
      broker.publish(Topics.ALERT, {
        cargaId,
        tipo: 'PORTA_ABERTA',
        severidade: 'MEDIUM',
        mensagem: 'A porta da carga foi aberta durante o trajeto'
      });
    }
  }

  private handleSpeed(message: EventPayload) {
    const { loadId, speed } = message;
    if (speed > 100) {
      broker.publish(Topics.ALERT, {
        cargaId: loadId || message.cargaId,
        tipo: 'VELOCIDADE_ALTA',
        severidade: 'HIGH',
        mensagem: `Velocidade acima do limite (100km/h): ${speed}km/h`
      });
    }
  }

  private handleBattery(message: EventPayload) {
    const { loadId, level } = message;
    if (level < 20) {
      broker.publish(Topics.ALERT, {
        cargaId: loadId || message.cargaId,
        tipo: 'BATERIA_BAIXA',
        severidade: 'HIGH',
        mensagem: `Nível de bateria crítico: ${level}%`
      });
    }
  }
}

export const riskSubscriber = new RiskSubscriber();
