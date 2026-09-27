export const Topics = {
  LOCATION: 'carga.localizacao',
  TEMPERATURE: 'carga.temperatura',
  DOOR: 'carga.porta',
  STATUS: 'carga.status',
  ALERT: 'carga.alerta',
} as const;

export type Topic = typeof Topics[keyof typeof Topics];
