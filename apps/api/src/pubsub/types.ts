export interface EventPayload {
  cargaId: string;
  [key: string]: any;
}

export interface Subscriber {
  id: string;
  onMessage: (topic: string, message: EventPayload) => void;
}
