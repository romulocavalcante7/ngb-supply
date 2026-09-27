import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Activity, Server, Radio, Database } from 'lucide-react';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');

interface PubSubEvent {
  id: string;
  topic: string;
  time: string;
  payload: any;
}

export function Events() {
  const [events, setEvents] = useState<PubSubEvent[]>([]);
  const [topicCounts, setTopicCounts] = useState<Record<string, number>>({
    'carga.localizacao': 42,
    'carga.temperatura': 31,
    'carga.porta': 18,
    'carga.alerta': 7,
  });

  useEffect(() => {
    const handleEvent = (topic: string) => (msg: any) => {
      const newEvent = {
        id: Math.random().toString(36).substr(2, 9),
        topic,
        time: new Date().toLocaleTimeString(),
        payload: msg
      };
      
      setEvents(prev => [newEvent, ...prev].slice(0, 50));
      setTopicCounts(prev => ({ ...prev, [topic]: (prev[topic] || 0) + 1 }));
    };

    const topics = ['carga.localizacao', 'carga.temperatura', 'carga.porta', 'carga.alerta'];
    topics.forEach(t => socket.on(t, handleEvent(t)));

    return () => {
      topics.forEach(t => socket.off(t));
    };
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Activity className="text-accent w-6 h-6" />
          Pub/Sub Monitor
        </h1>
        <p className="text-slate-400 text-sm">Monitoramento em tempo real do broker de mensagens</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Topic Stats */}
        <div className="col-span-1 space-y-4">
          <div className="glass-panel p-5">
            <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
              <Server className="w-4 h-4" />
              Tópicos Ativos
            </h2>
            <div className="space-y-3">
              {Object.entries(topicCounts).map(([topic, count]) => (
                <div key={topic} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-lg border border-slate-800">
                  <span className="text-sm text-slate-300 font-mono">{topic}</span>
                  <span className="text-accent font-bold">{count}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="glass-panel p-5">
            <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
              <Database className="w-4 h-4" />
              Status do Broker
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
              </div>
              <span className="text-emerald-400 font-medium">Conectado e Operacional</span>
            </div>
          </div>
        </div>

        {/* Live Feed */}
        <div className="col-span-1 lg:col-span-2 glass-panel p-5 flex flex-col min-h-[500px]">
          <h2 className="text-sm font-semibold text-slate-300 flex items-center gap-2 mb-4">
            <Radio className="w-4 h-4 text-primary animate-pulse" />
            Fluxo de Mensagens
          </h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {events.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500">
                <Radio className="w-8 h-8 mb-2 opacity-50" />
                <p>Aguardando publicações no broker...</p>
              </div>
            ) : (
              events.map((evt) => (
                <div key={evt.id} className="bg-slate-900/80 border border-slate-800 rounded-lg p-4 animate-fade-in-down hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                      {evt.topic}
                    </span>
                    <span className="text-xs text-slate-500">{evt.time}</span>
                  </div>
                  <pre className="text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap font-mono">
                    {JSON.stringify(evt.payload, null, 2)}
                  </pre>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
