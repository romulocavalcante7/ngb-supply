import { describe, it, expect, vi } from 'vitest';
import { PubSubBroker } from './broker';

describe('PubSubBroker', () => {
  it('deve permitir que um subscriber receba um evento (subscribe + publish)', () => {
    const broker = new PubSubBroker();
    const subscriber = { id: 'test-sub', onMessage: vi.fn() };
    
    broker.subscribe('carga.teste', subscriber);
    broker.publish('carga.teste', { msg: 'Hello' });
    
    expect(subscriber.onMessage).toHaveBeenCalledWith('carga.teste', { msg: 'Hello' });
  });

  it('não deve enviar mensagem para subscriber após unsubscribe', () => {
    const broker = new PubSubBroker();
    const subscriber = { id: 'test-sub', onMessage: vi.fn() };
    
    broker.subscribe('carga.teste', subscriber);
    broker.publish('carga.teste', { msg: 'Primeira' });
    
    broker.unsubscribe('carga.teste', subscriber);
    broker.publish('carga.teste', { msg: 'Segunda' });
    
    expect(subscriber.onMessage).toHaveBeenCalledTimes(1); // Só recebeu a primeira
  });

  it('múltiplos subscribers recebem o mesmo evento', () => {
    const broker = new PubSubBroker();
    const sub1 = { id: 'sub1', onMessage: vi.fn() };
    const sub2 = { id: 'sub2', onMessage: vi.fn() };
    
    broker.subscribe('carga.alerta', sub1);
    broker.subscribe('carga.alerta', sub2);
    
    broker.publish('carga.alerta', { danger: true });
    
    expect(sub1.onMessage).toHaveBeenCalledTimes(1);
    expect(sub2.onMessage).toHaveBeenCalledTimes(1);
  });

  it('publicar em tópico inexistente não quebra o broker', () => {
    const broker = new PubSubBroker();
    expect(() => {
      broker.publish('topico.fantasma', { data: 123 });
    }).not.toThrow();
  });
});
