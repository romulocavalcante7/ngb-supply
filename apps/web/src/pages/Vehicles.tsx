import { Car, Search, Filter, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';

export function Vehicles() {
  const mockVehicles = [
    { id: 'V-001', plate: 'ABC-1234', model: 'Volvo FH', type: 'Carreta', status: 'AVAILABLE', capacity: '25t' },
    { id: 'V-002', plate: 'XYZ-9876', model: 'Scania R450', type: 'Bitrem', status: 'IN_TRIP', capacity: '30t' },
    { id: 'V-003', plate: 'DEF-5678', model: 'Mercedes Actros', type: 'Truck', status: 'MAINTENANCE', capacity: '15t' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Car className="text-accent w-6 h-6" />
            Gestão de Veículos
          </h1>
          <p className="text-slate-400 text-sm">Controle de frota, capacidades e manutenção</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" /> Filtrar
          </Button>
          <Button>
            <Plus className="w-4 h-4 mr-2" /> Novo Veículo
          </Button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="p-4 border-b border-slate-800 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Buscar por placa, modelo ou ID..." 
              className="w-full bg-slate-900/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-200 outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/50 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Veículo / Placa</th>
                <th className="px-6 py-4 font-medium">Modelo</th>
                <th className="px-6 py-4 font-medium">Capacidade</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-slate-300">
              {mockVehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-200">{v.plate}</div>
                    <div className="text-xs text-slate-500">{v.id}</div>
                  </td>
                  <td className="px-6 py-4">{v.model} ({v.type})</td>
                  <td className="px-6 py-4">{v.capacity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                      v.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                      v.status === 'IN_TRIP' ? 'bg-primary/10 text-primary border-primary/20' : 
                      'bg-warning/10 text-warning border-warning/20'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm">Editar</Button>
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
