import { Map, Search, Filter, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Trips() {
  const mockTrips = [
    { id: 'TRP-001', origin: 'Goiânia - GO', destination: 'Brasília - DF', vehicle: 'ABC-1234', driver: 'Carlos Silva', status: 'IN_PROGRESS', start: '2023-10-27 08:00' },
    { id: 'TRP-002', origin: 'Anápolis - GO', destination: 'São Paulo - SP', vehicle: 'XYZ-9876', driver: 'Roberto Santos', status: 'COMPLETED', start: '2023-10-25 06:00' },
    { id: 'TRP-003', origin: 'Rio Verde - GO', destination: 'Campinas - SP', vehicle: 'ABC-1234', driver: 'Carlos Silva', status: 'PLANNED', start: 'A definir' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Map className="text-accent w-6 h-6" />
            Gestão de Viagens
          </h1>
          <p className="text-slate-400 text-sm">Controle de origens, destinos e status operacional</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Nova Viagem
          </Button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por ID, origem ou destino..." 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Viagem ID</th>
                <th className="px-6 py-4 font-medium">Rota (Origem → Destino)</th>
                <th className="px-6 py-4 font-medium">Veículo / Motorista</th>
                <th className="px-6 py-4 font-medium">Partida</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {mockTrips.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-slate-200">{t.id}</td>
                  <td className="px-6 py-4">
                    <div className="text-slate-200">{t.origin}</div>
                    <div className="text-xs text-slate-500">→ {t.destination}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-200">{t.vehicle}</div>
                    <div className="text-xs text-slate-500">{t.driver}</div>
                  </td>
                  <td className="px-6 py-4">{t.start}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      t.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      t.status === 'IN_PROGRESS' ? 'bg-primary/10 text-primary border-primary/20' : 
                      'bg-slate-500/10 text-slate-400 border-slate-500/20'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">Ver Rota</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
