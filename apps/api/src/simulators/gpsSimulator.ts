import { gpsPublisher } from '../publishers/gpsPublisher';

export class GpsSimulator {
  simulate(cargaId: string, latitude: number, longitude: number, cidade: string) {
    gpsPublisher.publishLocation(cargaId, latitude, longitude, cidade);
  }
}

export const gpsSimulator = new GpsSimulator();
