export const Topics = {
  LOCATION: 'carga.localizacao',
  TEMPERATURE: 'carga.temperatura',
  DOOR: 'carga.porta',
  SPEED: 'carga.velocidade',
  BATTERY: 'carga.bateria',
  STATUS: 'carga.status',
  ALERT: 'carga.alerta',
} as const;

export type Topic = typeof Topics[keyof typeof Topics];
