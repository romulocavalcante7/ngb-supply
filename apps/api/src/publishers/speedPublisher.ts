export class SpeedPublisher {
  constructor(private broker: any) {}

  publish(loadId: string, speed: number) {
    this.broker.publish('carga.velocidade', {
      loadId,
      speed,
      timestamp: new Date().toISOString(),
    });
  }
}
