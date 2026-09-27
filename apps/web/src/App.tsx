import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Package, Thermometer, ShieldAlert, DoorClosed, MapPin, Activity } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const socket = io(import.meta.env.VITE_API_URL || 'http://localhost:3001');

const dataMock = [
  { time: '10:00', temp: 5 },
  { time: '10:05', temp: 6 },
  { time: '10:10', temp: 5.5 },
  { time: '10:15', temp: 8 },
  { time: '10:20', temp: 12 },
];

export default function App() {
  const [events, setEvents] = useState<string[]>([]);
  
  useEffect(() => {
    socket.on('carga.temperatura', (msg) => {
      setEvents((prev) => [`[${msg.timestamp}] Temperatura: ${msg.temperatura} ${msg.unidade}`, ...prev]);
    });
    
    socket.on('carga.alerta', (msg) => {
      setEvents((prev) => [`🚨 [ALERTA] ${msg.mensagem}`, ...prev]);
    });
    
    return () => {
      socket.off('carga.temperatura');
      socket.off('carga.alerta');
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg-dark)] text-slate-100 p-4 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-7xl flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-primary/20 rounded-xl">
            <Package className="w-8 h-8 text-[var(--color-primary)] glow-text" />
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">NGB Supply</h1>
            <p className="text-sm text-slate-400">Rastreamento Inteligente em Tempo Real</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-sm font-medium text-slate-300">Sistema Online</span>
        </div>
      </header>

      <main className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KPI Cards */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
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
        <div className="glass-panel p-6 col-span-1 md:col-span-2 min-h-[300px]">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Thermometer className="w-5 h-5 text-primary" />
            Variação Térmica (CARGA-001)
          </h2>
          <div className="h-64 w-full">
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
        <div className="glass-panel p-6 flex flex-col">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            Live Feed (Pub/Sub)
          </h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {events.length === 0 ? (
              <div className="text-slate-500 text-sm text-center mt-10">
                Aguardando eventos dos sensores...
              </div>
            ) : (
              events.map((evt, i) => (
                <div key={i} className="bg-[var(--color-bg-dark)] border border-slate-800 p-3 rounded-lg text-sm flex gap-3 animate-fade-in-down">
                  <span className="text-primary mt-0.5">•</span>
                  <span className="text-slate-300">{evt}</span>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-800">
            <h3 className="text-sm font-medium text-slate-400 mb-3">Simular Sensores</h3>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => fetch('http://localhost:3001/api/simulation/temperature', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({ cargaId: 'CARGA-001', temperatura: 12.8 })
                })}
                className="bg-primary/10 hover:bg-primary/20 border border-primary/30 text-primary transition-all py-2 rounded-lg text-xs font-medium"
              >
                Temp. Alta
              </button>
              <button 
                onClick={() => fetch('http://localhost:3001/api/simulation/temperature', {
                  method: 'POST',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({ cargaId: 'CARGA-001', temperatura: 5.0 })
                })}
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 transition-all py-2 rounded-lg text-xs font-medium"
              >
                Temp. Normal
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
