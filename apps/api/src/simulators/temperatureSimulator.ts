import { temperaturePublisher } from '../publishers/temperaturePublisher';

export class TemperatureSimulator {
  simulate(cargaId: string, temperatura: number) {
    temperaturePublisher.publishTemperature(cargaId, temperatura);
  }
}

export const temperatureSimulator = new TemperatureSimulator();
