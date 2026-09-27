import { LineChart, Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Activity, Thermometer, Zap, Navigation } from 'lucide-react';

const mockTelemetry = [
  { time: '08:00', temp: 8.2, speed: 65, battery: 90 },
  { time: '08:30', temp: 8.4, speed: 72, battery: 89 },
  { time: '09:00', temp: 8.5, speed: 75, battery: 88 },
  { time: '09:30', temp: 9.1, speed: 80, battery: 87 },
  { time: '10:00', temp: 11.2, speed: 105, battery: 85 }, // Pico de temperatura e velocidade
  { time: '10:30', temp: 9.8, speed: 85, battery: 84 },
  { time: '11:00', temp: 8.4, speed: 72, battery: 83 },
];

export function Telemetry() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Activity className="text-accent w-6 h-6" />
          Dashboard de Telemetria
        </h1>
        <p className="text-slate-400 text-sm">Análise gráfica de dados históricos dos sensores (Pub/Sub)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de Temperatura */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-primary" />
              Variação de Temperatura
            </h3>
            <select className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none">
              <option>Últimas 4 horas</option>
              <option>Hoje</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTelemetry}>
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={[0, 15]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorTemp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Velocidade */}
        <div className="glass-panel p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-500" />
              Velocidade do Veículo
            </h3>
            <select className="bg-slate-900 border border-slate-800 text-slate-300 text-xs rounded-lg px-2 py-1 outline-none">
              <option>Últimas 4 horas</option>
              <option>Hoje</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTelemetry}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={[0, 120]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Line type="monotone" dataKey="speed" stroke="#10b981" strokeWidth={3} dot={{ fill: '#0f172a', strokeWidth: 2 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Gráfico de Bateria */}
        <div className="glass-panel p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Zap className="w-4 h-4 text-warning" />
              Descarga da Bateria (Sensores)
            </h3>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTelemetry}>
                <defs>
                  <linearGradient id="colorBat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="time" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#e2e8f0' }}
                />
                <Area type="monotone" dataKey="battery" stroke="#f59e0b" strokeWidth={3} fillOpacity={1} fill="url(#colorBat)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
