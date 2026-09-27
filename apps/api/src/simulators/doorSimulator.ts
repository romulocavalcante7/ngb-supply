import { doorPublisher } from '../publishers/doorPublisher';

export class DoorSimulator {
  simulate(cargaId: string, status: 'ABERTA' | 'FECHADA') {
    doorPublisher.publishDoorStatus(cargaId, status);
  }
}

export const doorSimulator = new DoorSimulator();
