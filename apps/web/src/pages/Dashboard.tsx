import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Thermometer, ShieldAlert, MapPin, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useToastStore } from '../stores/toastStore';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');

const dataMock = [
  { time: '10:00', temp: 5 },
  { time: '10:05', temp: 6 },
  { time: '10:10', temp: 5.5 },
  { time: '10:15', temp: 8 },
  { time: '10:20', temp: 12 },
];

export function Dashboard() {
  const [events, setEvents] = useState<string[]>([]);
  const addToast = useToastStore(state => state.addToast);
  
  useEffect(() => {
    socket.on('carga.temperatura', (msg) => {
      setEvents((prev) => [`[${msg.timestamp}] Temperatura: ${msg.temperatura} ${msg.unidade}`, ...prev]);
    });
    
    socket.on('carga.alerta', (msg) => {
      setEvents((prev) => [`🚨 [ALERTA] ${msg.mensagem}`, ...prev]);
      addToast(msg.mensagem, 'error');
    });
    
    return () => {
      socket.off('carga.temperatura');
      socket.off('carga.alerta');
    };
  }, []);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
      
      {/* KPI Cards */}
      <div className="col-span-1 xl:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-6 flex flex-col justify-center items-center relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all"></div>
          <Activity className="text-primary mb-2 w-8 h-8" />
          <span className="text-4xl font-bold glow-text">12</span>
          <span className="text-sm text-slate-400 mt-1">Cargas em Trânsito</span>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-center items-center relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-warning/10 rounded-full blur-2xl group-hover:bg-warning/20 transition-all"></div>
          <Thermometer className="text-[var(--color-warning)] mb-2 w-8 h-8" />
          <span className="text-4xl font-bold">2</span>
          <span className="text-sm text-slate-400 mt-1">Alertas Térmicos</span>
        </div>

        <div className="glass-panel p-6 flex flex-col justify-center items-center relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-danger/10 rounded-full blur-2xl group-hover:bg-danger/20 transition-all"></div>
          <ShieldAlert className="text-[var(--color-danger)] mb-2 w-8 h-8" />
          <span className="text-4xl font-bold text-red-500">1</span>
          <span className="text-sm text-slate-400 mt-1">Ações Requeridas</span>
        </div>
        
        <div className="glass-panel p-6 flex flex-col justify-center items-center relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-success/10 rounded-full blur-2xl group-hover:bg-success/20 transition-all"></div>
          <MapPin className="text-[var(--color-success)] mb-2 w-8 h-8" />
          <span className="text-4xl font-bold text-emerald-400">18</span>
          <span className="text-sm text-slate-400 mt-1">Entregas Hoje</span>
        </div>
      </div>

      {/* Chart Area */}
      <div className="glass-panel p-6 col-span-1 xl:col-span-2 min-h-[400px] flex flex-col">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Thermometer className="w-5 h-5 text-primary" />
          Variação Térmica (CARGA-001)
        </h2>
        <div className="flex-1 w-full min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataMock}>
              <XAxis dataKey="time" stroke="#475569" />
              <YAxis stroke="#475569" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
              />
              <Line 
                type="monotone" 
                dataKey="temp" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ r: 4, fill: "var(--color-bg-dark)", strokeWidth: 2 }}
                activeDot={{ r: 6, fill: "var(--color-primary)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Live Event Feed */}
      <div className="glass-panel p-6 flex flex-col h-[400px]">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent" />
          Fluxo de Operações
        </h2>
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 mb-4">
          {events.length === 0 ? (
            <div className="text-slate-500 text-sm text-center mt-10">
              Aguardando atualizações da frota...
            </div>
          ) : (
            events.map((evt, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-800 p-3 rounded-lg text-sm flex gap-3 animate-fade-in-down">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-slate-300">{evt}</span>
              </div>
            ))
          )}
        </div>
        
        <div className="pt-4 border-t border-slate-800">
          <h3 className="text-sm font-medium text-slate-400 mb-3">Painel de Simulação (Apresentação)</h3>
          <div className="grid grid-cols-2 gap-2">
            <button 
              onClick={() => fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/simulation/temperature`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ cargaId: 'CARGA-001', temperatura: 12.8 })
              })}
              className="bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-all py-2 rounded-lg text-xs font-medium cursor-pointer"
            >
              Temp. Alta
            </button>
            <button 
              onClick={() => fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/simulation/temperature`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ cargaId: 'CARGA-001', temperatura: 5.0 })
              })}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all py-2 rounded-lg text-xs font-medium cursor-pointer"
            >
              Temp. Normal
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
