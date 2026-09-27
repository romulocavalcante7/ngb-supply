import { useState } from 'react';
import { Truck, Search, Filter } from 'lucide-react';
import { Drawer } from '../components/ui/Drawer';
import { Button } from '../components/ui/Button';
import { useToastStore } from '../stores/toastStore';

const mockLoads = [
  { id: 'CARGA-001', origin: 'Goiânia - GO', destination: 'Brasília - DF', status: 'IN_TRANSIT' },
  { id: 'CARGA-002', origin: 'Anápolis - GO', destination: 'São Paulo - SP', status: 'DELIVERED' },
  { id: 'CARGA-003', origin: 'Rio Verde - GO', destination: 'Campinas - SP', status: 'PLANNED' },
];

export function Loads() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const addToast = useToastStore(state => state.addToast);

  const handleCreateLoad = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDrawerOpen(false);
    addToast('Nova carga registrada com sucesso e em roteirização.', 'success');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Truck className="text-primary w-6 h-6" />
            Gestão de Cargas
          </h1>
          <p className="text-slate-400 text-sm">Monitore o status e histórico de todas as rotas ativas.</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="secondary">
            <Filter className="w-4 h-4 mr-2" />
            Filtrar
          </Button>
          <Button onClick={() => setIsDrawerOpen(true)}>
            + Nova Carga
          </Button>
        </div>
      </div>

      <div className="glass-panel overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-900/50 border-b border-slate-800 text-slate-400">
              <tr>
                <th className="px-6 py-4 font-medium">Código da Carga</th>
                <th className="px-6 py-4 font-medium">Origem</th>
                <th className="px-6 py-4 font-medium">Destino</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {mockLoads.map((load) => (
                <tr key={load.id} className="hover:bg-slate-800/20 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{load.id}</td>
                  <td className="px-6 py-4 text-slate-400">{load.origin}</td>
                  <td className="px-6 py-4 text-slate-400">{load.destination}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      load.status === 'IN_TRANSIT' ? 'bg-primary/10 text-primary border border-primary/20' :
                      load.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                      'bg-slate-800 text-slate-300 border border-slate-700'
                    }`}>
                      {load.status === 'IN_TRANSIT' ? 'Em Trânsito' : load.status === 'DELIVERED' ? 'Entregue' : 'Planejada'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-primary hover:text-primary/80 font-medium text-sm transition-colors">Detalhes</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Drawer 
        isOpen={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        title="Registrar Nova Carga"
      >
        <form onSubmit={handleCreateLoad} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Origem</label>
            <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-primary transition-colors" placeholder="Ex: São Paulo - SP" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Destino</label>
            <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-primary transition-colors" placeholder="Ex: Rio de Janeiro - RJ" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Veículo / Placa</label>
            <input required type="text" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-primary transition-colors" placeholder="Ex: ABC-1234" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Temperatura Alvo (°C)</label>
            <input type="number" defaultValue="8" className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-slate-200 outline-none focus:border-primary transition-colors" />
          </div>
          <div className="pt-6">
            <Button type="submit" className="w-full">Confirmar Registro</Button>
          </div>
        </form>
      </Drawer>
    </div>
  );
}
