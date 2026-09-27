import { useState } from 'react';
import { MapPin, Navigation, Compass, Truck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Tracking() {
  const [selectedLoad, setSelectedLoad] = useState('CARGA-001');

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Compass className="text-accent w-6 h-6" />
            Rastreamento de Frotas
          </h1>
          <p className="text-slate-400 text-sm">Monitoramento GPS ao vivo de veículos em operação</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">Rotas Otimizadas</Button>
          <Button>Visualização por Satélite</Button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6 min-h-0">
        {/* Painel lateral */}
        <div className="glass-panel p-4 overflow-y-auto space-y-4">
          <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Cargas Ativas</h3>
          
          {['CARGA-001', 'CARGA-002', 'CARGA-003'].map(id => (
            <div 
              key={id}
              onClick={() => setSelectedLoad(id)}
              className={`p-4 rounded-xl cursor-pointer border transition-all ${selectedLoad === id ? 'bg-primary/20 border-primary' : 'bg-slate-900 border-slate-800 hover:border-slate-700'}`}
            >
              <div className="flex justify-between items-start mb-2">
                <span className="font-semibold text-slate-200">{id}</span>
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
              </div>
              <p className="text-xs text-slate-400 mb-1">Goiânia → Brasília</p>
              <div className="flex gap-2 mt-3">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md">72 km/h</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-1 rounded-md">8.4°C</span>
              </div>
            </div>
          ))}
        </div>

        {/* Simulador de Mapa */}
        <div className="lg:col-span-3 glass-panel relative overflow-hidden flex items-center justify-center bg-[#0a0f1c]">
          {/* Grid background to simulate map map tiles */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          {/* Map routes and points */}
          <div className="relative w-full h-full p-10 flex items-center justify-center">
            <svg className="absolute w-[80%] h-[80%] opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M10,50 Q30,20 50,50 T90,50" fill="none" stroke="#3b82f6" strokeWidth="0.5" strokeDasharray="2,2" className="animate-pulse" />
            </svg>
            
            {/* Active tracking marker */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="bg-slate-900 border border-primary/50 shadow-2xl shadow-primary/20 p-4 rounded-xl mb-3 animate-slide-up backdrop-blur-md">
                <div className="text-sm font-bold text-slate-200">{selectedLoad}</div>
                <div className="text-xs text-slate-400 mb-2">Motorista: Carlos Silva</div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  <div className="text-slate-500">Velocidade:</div><div className="text-emerald-400 font-mono">72 km/h</div>
                  <div className="text-slate-500">Temperatura:</div><div className="text-primary font-mono">8.4 °C</div>
                  <div className="text-slate-500">Status:</div><div className="text-emerald-400">Em trânsito</div>
                </div>
              </div>
              <div className="relative">
                <span className="animate-ping absolute -inset-2 rounded-full bg-primary opacity-40"></span>
                <div className="bg-primary text-white p-2 rounded-full shadow-lg shadow-primary">
                  <Navigation className="w-5 h-5 fill-current" />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 flex gap-2">
            <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 px-4 py-2 rounded-lg text-xs text-slate-400">
              Coordenadas: -16.6869, -49.2648
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
