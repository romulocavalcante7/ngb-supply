export class BatteryPublisher {
  constructor(private broker: any) {}

  publish(loadId: string, level: number) {
    this.broker.publish('carga.bateria', {
      loadId,
      level,
      timestamp: new Date().toISOString(),
    });
  }
}
